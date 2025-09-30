import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import Razorpay from "razorpay";
import crypto from "crypto";
import { storage } from "./storage";
import { db } from "./db";
import { users } from "@shared/schema";
import { 
  insertBlogPostSchema, 
  insertTestimonialSchema, 
  insertContactSchema,
  insertServicePackageSchema,
  insertPaymentSchema,
  insertUserSchema,
  insertSessionSchema,
  insertPageViewSchema,
  insertEventSchema
} from "@shared/schema";
import { z } from "zod";

// Extend Express session type
declare module 'express-session' {
  interface SessionData {
    userId?: string;
    username?: string;
  }
}

// Authentication middleware
function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: "Authentication required" });
  }
}

export async function registerRoutes(app: Express): Promise<Server> {

  // Rate limiters for authentication endpoints
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit to 5 attempts per window per IP
    message: { error: "Too many authentication attempts. Please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  const adminCreationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 1, // Only 1 admin creation attempt per hour per IP
    message: { error: "Too many admin creation attempts. Please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Authentication Routes
  app.post("/api/auth/login", authLimiter, async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);

      const user = await storage.getUserByUsername(validatedData.username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValid = await bcrypt.compare(validatedData.password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Regenerate session ID to prevent session fixation attacks
      req.session.regenerate((err) => {
        if (err) {
          console.error("Session regeneration error:", err);
          return res.status(500).json({ error: "Internal server error" });
        }
        
        req.session.userId = user.id;
        req.session.username = user.username;
        
        res.json({ message: "Login successful", username: user.username });
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid login data", details: error.errors });
      }
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({ error: "Failed to logout" });
      }
      res.clearCookie('aakaar.sid'); // Match the custom session name
      res.json({ message: "Logout successful" });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (req.session.userId) {
      res.json({ 
        authenticated: true, 
        username: req.session.username 
      });
    } else {
      res.json({ authenticated: false });
    }
  });

  // Create admin user endpoint (protected - requires setup token and no existing users)
  app.post("/api/auth/create-admin", adminCreationLimiter, async (req, res) => {
    try {
      // Require setup token for additional security during initial deployment
      const setupToken = req.headers['x-setup-token'];
      if (!setupToken || setupToken !== process.env.INIT_ADMIN_TOKEN) {
        return res.status(403).json({ 
          error: "Invalid or missing setup token. This endpoint requires proper authorization." 
        });
      }

      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if any users already exist (prevent multiple admin creation)
      const existingUsers = await db.select().from(users).limit(1);
      if (existingUsers.length > 0) {
        return res.status(403).json({ 
          error: "Admin user already exists. This endpoint is only available during initial setup." 
        });
      }

      const hashedPassword = await bcrypt.hash(validatedData.password, 12);
      const user = await storage.createUser({ 
        username: validatedData.username, 
        password: hashedPassword 
      });
      
      res.status(201).json({ 
        message: "Admin user created successfully", 
        username: user.username 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid user data", details: error.errors });
      }
      console.error("Create admin error:", error);
      res.status(500).json({ error: "Failed to create admin user" });
    }
  });
  
  // Blog Posts API
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  // Testimonials API
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getApprovedTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // Contact Form API
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // TODO: Send email notification
      console.log("New contact form submission:", contact);
      
      res.status(201).json({ message: "Contact form submitted successfully", id: contact.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid form data", details: error.errors });
      }
      console.error("Error submitting contact form:", error);
      res.status(500).json({ error: "Failed to submit contact form" });
    }
  });

  // Protected Admin APIs
  
  // Admin Blog Posts
  app.get("/api/admin/blog-posts", requireAuth, async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching admin blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.post("/api/admin/blog-posts", requireAuth, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid blog post data", details: error.errors });
      }
      console.error("Error creating blog post:", error);
      res.status(500).json({ error: "Failed to create blog post" });
    }
  });

  app.put("/api/admin/blog-posts/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(req.params.id, validatedData);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid blog post data", details: error.errors });
      }
      console.error("Error updating blog post:", error);
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });

  app.delete("/api/admin/blog-posts/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteBlogPost(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  // Admin Testimonials
  app.get("/api/admin/testimonials", requireAuth, async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching admin testimonials:", error);
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.post("/api/admin/testimonials", requireAuth, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid testimonial data", details: error.errors });
      }
      console.error("Error creating testimonial:", error);
      res.status(500).json({ error: "Failed to create testimonial" });
    }
  });

  app.put("/api/admin/testimonials/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.partial().parse(req.body);
      const testimonial = await storage.updateTestimonial(req.params.id, validatedData);
      if (!testimonial) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.json(testimonial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid testimonial data", details: error.errors });
      }
      console.error("Error updating testimonial:", error);
      res.status(500).json({ error: "Failed to update testimonial" });
    }
  });

  app.delete("/api/admin/testimonials/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteTestimonial(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Testimonial not found" });
      }
      res.json({ message: "Testimonial deleted successfully" });
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      res.status(500).json({ error: "Failed to delete testimonial" });
    }
  });

  // Admin Contacts
  app.get("/api/admin/contacts", requireAuth, async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching admin contacts:", error);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  app.put("/api/admin/contacts/:id/status", requireAuth, async (req, res) => {
    try {
      const { status } = req.body;
      const contact = await storage.updateContactStatus(req.params.id, status);
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      console.error("Error updating contact status:", error);
      res.status(500).json({ error: "Failed to update contact status" });
    }
  });

  // Admin Service Packages
  app.get("/api/admin/service-packages", requireAuth, async (req, res) => {
    try {
      const packages = await storage.getAllServicePackages();
      res.json(packages);
    } catch (error) {
      console.error("Error fetching admin service packages:", error);
      res.status(500).json({ error: "Failed to fetch service packages" });
    }
  });

  app.post("/api/admin/service-packages", requireAuth, async (req, res) => {
    try {
      const validatedData = insertServicePackageSchema.parse(req.body);
      const servicePackage = await storage.createServicePackage(validatedData);
      res.status(201).json(servicePackage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid service package data", details: error.errors });
      }
      console.error("Error creating service package:", error);
      res.status(500).json({ error: "Failed to create service package" });
    }
  });

  app.put("/api/admin/service-packages/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = insertServicePackageSchema.partial().parse(req.body);
      const servicePackage = await storage.updateServicePackage(req.params.id, validatedData);
      if (!servicePackage) {
        return res.status(404).json({ error: "Service package not found" });
      }
      res.json(servicePackage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid service package data", details: error.errors });
      }
      console.error("Error updating service package:", error);
      res.status(500).json({ error: "Failed to update service package" });
    }
  });

  app.delete("/api/admin/service-packages/:id", requireAuth, async (req, res) => {
    try {
      const success = await storage.deleteServicePackage(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Service package not found" });
      }
      res.json({ message: "Service package deleted successfully" });
    } catch (error) {
      console.error("Error deleting service package:", error);
      res.status(500).json({ error: "Failed to delete service package" });
    }
  });

  // Admin Payments
  app.get("/api/admin/payments", requireAuth, async (req, res) => {
    try {
      const payments = await storage.getAllPayments();
      res.json(payments);
    } catch (error) {
      console.error("Error fetching admin payments:", error);
      res.status(500).json({ error: "Failed to fetch payments" });
    }
  });

  app.get("/api/admin/payments/status/:status", requireAuth, async (req, res) => {
    try {
      const payments = await storage.getPaymentsByStatus(req.params.status);
      res.json(payments);
    } catch (error) {
      console.error("Error fetching payments by status:", error);
      res.status(500).json({ error: "Failed to fetch payments" });
    }
  });

  app.post("/api/admin/payments", requireAuth, async (req, res) => {
    try {
      const validatedData = insertPaymentSchema.parse(req.body);
      const payment = await storage.createPayment(validatedData);
      res.status(201).json(payment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid payment data", details: error.errors });
      }
      console.error("Error creating payment:", error);
      res.status(500).json({ error: "Failed to create payment" });
    }
  });

  app.put("/api/admin/payments/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = insertPaymentSchema.partial().parse(req.body);
      const payment = await storage.updatePayment(req.params.id, validatedData);
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      res.json(payment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid payment data", details: error.errors });
      }
      console.error("Error updating payment:", error);
      res.status(500).json({ error: "Failed to update payment" });
    }
  });

  // Public Service Packages API (for frontend)
  app.get("/api/service-packages", async (req, res) => {
    try {
      const packages = await storage.getActiveServicePackages();
      res.json(packages);
    } catch (error) {
      console.error("Error fetching service packages:", error);
      res.status(500).json({ error: "Failed to fetch service packages" });
    }
  });

  // Payment Gateway API (Razorpay)
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || '',
  });

  app.post("/api/payments/create-order", async (req, res) => {
    try {
      const { amount, packageId, customerName, customerEmail, customerPhone } = req.body;

      if (!amount || !packageId || !customerName || !customerEmail || !customerPhone) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const options = {
        amount: amount,
        currency: 'INR',
        receipt: `order_${Date.now()}`,
        payment_capture: 1
      };

      const order = await razorpay.orders.create(options);

      const payment = await storage.createPayment({
        transactionId: order.id,
        customerName,
        customerEmail,
        amount,
        status: 'pending',
        packageId,
        metadata: JSON.stringify({ 
          orderId: order.id,
          customerPhone
        })
      });

      res.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        paymentId: payment.id
      });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.post("/api/payments/verify", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !paymentId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || '')
        .update(sign.toString())
        .digest("hex");

      if (razorpay_signature === expectedSign) {
        const updatedPayment = await storage.updatePayment(paymentId, {
          status: 'completed',
          transactionId: razorpay_payment_id,
          metadata: JSON.stringify({
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            verifiedAt: new Date().toISOString()
          })
        });

        res.json({ 
          message: "Payment verified successfully",
          payment: updatedPayment
        });
      } else {
        await storage.updatePayment(paymentId, {
          status: 'failed',
          metadata: JSON.stringify({ 
            error: 'Invalid signature',
            attemptedAt: new Date().toISOString()
          })
        });

        res.status(400).json({ error: "Invalid signature" });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ error: "Failed to verify payment" });
    }
  });

  // Analytics API
  app.post("/api/analytics/session", async (req, res) => {
    try {
      const validatedData = insertSessionSchema.parse(req.body);
      
      // Check if session already exists
      const existingSession = await storage.getSession(validatedData.sessionId);
      if (existingSession) {
        // Update existing session
        // Only increment pageViews if this is not just a duration update
        const isPageViewUpdate = !validatedData.duration || validatedData.duration === 0;
        const updated = await storage.updateSession(validatedData.sessionId, {
          pageViews: isPageViewUpdate ? (existingSession.pageViews || 0) + 1 : existingSession.pageViews,
          duration: validatedData.duration || existingSession.duration,
        });
        return res.json(updated);
      }
      
      // Create new session
      const session = await storage.createSession(validatedData);
      res.status(201).json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid session data", details: error.errors });
      }
      console.error("Analytics session error:", error);
      res.status(500).json({ error: "Failed to track session" });
    }
  });

  app.post("/api/analytics/pageview", async (req, res) => {
    try {
      const validatedData = insertPageViewSchema.parse(req.body);
      const pageView = await storage.createPageView(validatedData);
      res.status(201).json(pageView);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid page view data", details: error.errors });
      }
      console.error("Analytics pageview error:", error);
      res.status(500).json({ error: "Failed to track page view" });
    }
  });

  app.post("/api/analytics/event", async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid event data", details: error.errors });
      }
      console.error("Analytics event error:", error);
      res.status(500).json({ error: "Failed to track event" });
    }
  });

  // Admin Analytics API
  app.get("/api/admin/analytics/summary", requireAuth, async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const start = startDate ? new Date(startDate as string) : undefined;
      const end = endDate ? new Date(endDate as string) : undefined;
      
      const summary = await storage.getAnalyticsSummary(start, end);
      res.json(summary);
    } catch (error) {
      console.error("Analytics summary error:", error);
      res.status(500).json({ error: "Failed to fetch analytics summary" });
    }
  });

  app.get("/api/admin/analytics/sessions", requireAuth, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const offset = parseInt(req.query.offset as string) || 0;
      
      const sessions = await storage.getSessionsWithMetrics(limit, offset);
      res.json(sessions);
    } catch (error) {
      console.error("Analytics sessions error:", error);
      res.status(500).json({ error: "Failed to fetch sessions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
