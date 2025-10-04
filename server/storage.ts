import { 
  users, 
  blogPosts, 
  testimonials, 
  contacts,
  servicePackages,
  payments,
  sessions,
  pageViews,
  events,
  type User, 
  type InsertUser,
  type BlogPost,
  type InsertBlogPost,
  type Testimonial,
  type InsertTestimonial,
  type Contact,
  type InsertContact,
  type ServicePackage,
  type InsertServicePackage,
  type Payment,
  type InsertPayment,
  type Session,
  type InsertSession,
  type PageView,
  type InsertPageView,
  type Event,
  type InsertEvent
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, gte, count, sql, isNull, and } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Blog posts
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  
  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  getApprovedTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: string): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;
  
  // Contacts
  getAllContacts(): Promise<Contact[]>;
  getContact(id: string): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContactStatus(id: string, status: string): Promise<Contact | undefined>;
  deleteContact(id: string): Promise<boolean>;
  
  // Service packages
  getAllServicePackages(): Promise<ServicePackage[]>;
  getActiveServicePackages(): Promise<ServicePackage[]>;
  getServicePackage(id: string): Promise<ServicePackage | undefined>;
  createServicePackage(servicePackage: InsertServicePackage): Promise<ServicePackage>;
  updateServicePackage(id: string, servicePackage: Partial<InsertServicePackage>): Promise<ServicePackage | undefined>;
  deleteServicePackage(id: string): Promise<boolean>;
  
  // Payments
  getAllPayments(): Promise<Payment[]>;
  getPayment(id: string): Promise<Payment | undefined>;
  getPaymentsByStatus(status: string): Promise<Payment[]>;
  getPaymentsByCustomer(customerEmail: string): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: string, payment: Partial<InsertPayment>): Promise<Payment | undefined>;
  deletePayment(id: string): Promise<boolean>;
  
  // Analytics
  createSession(session: InsertSession): Promise<Session>;
  updateSession(sessionId: string, updates: Partial<InsertSession>): Promise<Session | undefined>;
  getSession(sessionId: string): Promise<Session | undefined>;
  createPageView(pageView: InsertPageView): Promise<PageView>;
  createEvent(event: InsertEvent): Promise<Event>;
  getAnalyticsSummary(startDate?: Date, endDate?: Date): Promise<{
    totalSessions: number;
    totalPageViews: number;
    totalEvents: number;
    avgSessionDuration: number;
    topPages: Array<{ path: string; views: number }>;
    topReferrers: Array<{ referrer: string; sessions: number }>;
    deviceBreakdown: Array<{ deviceType: string; count: number }>;
  }>;
  getSessionsWithMetrics(limit?: number, offset?: number): Promise<Session[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Blog posts
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [created] = await db
      .insert(blogPosts)
      .values(post)
      .returning();
    return created;
  }

  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [updated] = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  }

  async getApprovedTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials)
      .where(eq(testimonials.status, "approved"))
      .orderBy(desc(testimonials.createdAt));
  }

  async getTestimonial(id: string): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial || undefined;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [created] = await db
      .insert(testimonials)
      .values(testimonial)
      .returning();
    return created;
  }

  async updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [updated] = await db
      .update(testimonials)
      .set(testimonial)
      .where(eq(testimonials.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Contacts
  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async getContact(id: string): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact || undefined;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [created] = await db
      .insert(contacts)
      .values(contact)
      .returning();
    return created;
  }

  async updateContactStatus(id: string, status: string): Promise<Contact | undefined> {
    const [updated] = await db
      .update(contacts)
      .set({ status })
      .where(eq(contacts.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteContact(id: string): Promise<boolean> {
    const result = await db.delete(contacts).where(eq(contacts.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Service packages
  async getAllServicePackages(): Promise<ServicePackage[]> {
    return await db.select().from(servicePackages)
      .where(isNull(servicePackages.deletedAt))
      .orderBy(desc(servicePackages.createdAt));
  }

  async getActiveServicePackages(): Promise<ServicePackage[]> {
    return await db.select().from(servicePackages)
      .where(and(
        eq(servicePackages.isActive, true),
        isNull(servicePackages.deletedAt)
      ))
      .orderBy(desc(servicePackages.createdAt));
  }

  async getServicePackage(id: string): Promise<ServicePackage | undefined> {
    const [servicePackage] = await db.select().from(servicePackages).where(eq(servicePackages.id, id));
    return servicePackage || undefined;
  }

  async createServicePackage(servicePackage: InsertServicePackage): Promise<ServicePackage> {
    const [created] = await db
      .insert(servicePackages)
      .values(servicePackage)
      .returning();
    return created;
  }

  async updateServicePackage(id: string, servicePackage: Partial<InsertServicePackage>): Promise<ServicePackage | undefined> {
    const [updated] = await db
      .update(servicePackages)
      .set({ ...servicePackage, updatedAt: new Date() })
      .where(eq(servicePackages.id, id))
      .returning();
    return updated || undefined;
  }

  async deleteServicePackage(id: string): Promise<boolean> {
    const [updated] = await db
      .update(servicePackages)
      .set({ deletedAt: new Date() })
      .where(eq(servicePackages.id, id))
      .returning();
    return !!updated;
  }

  // Payments
  async getAllPayments(): Promise<Payment[]> {
    return await db.select().from(payments).orderBy(desc(payments.createdAt));
  }

  async getPayment(id: string): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.id, id));
    return payment || undefined;
  }

  async getPaymentsByStatus(status: string): Promise<Payment[]> {
    return await db.select().from(payments)
      .where(eq(payments.status, status))
      .orderBy(desc(payments.createdAt));
  }

  async getPaymentsByCustomer(customerEmail: string): Promise<Payment[]> {
    return await db.select().from(payments)
      .where(eq(payments.customerEmail, customerEmail))
      .orderBy(desc(payments.createdAt));
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [created] = await db
      .insert(payments)
      .values(payment)
      .returning();
    return created;
  }

  async updatePayment(id: string, payment: Partial<InsertPayment>): Promise<Payment | undefined> {
    const [updated] = await db
      .update(payments)
      .set({ ...payment, updatedAt: new Date() })
      .where(eq(payments.id, id))
      .returning();
    return updated || undefined;
  }

  async deletePayment(id: string): Promise<boolean> {
    const result = await db.delete(payments).where(eq(payments.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Analytics methods
  async createSession(session: InsertSession): Promise<Session> {
    const [created] = await db
      .insert(sessions)
      .values(session)
      .returning();
    return created;
  }

  async updateSession(sessionId: string, updates: Partial<InsertSession>): Promise<Session | undefined> {
    const [updated] = await db
      .update(sessions)
      .set({ ...updates, lastActivityAt: new Date() })
      .where(eq(sessions.sessionId, sessionId))
      .returning();
    return updated || undefined;
  }

  async getSession(sessionId: string): Promise<Session | undefined> {
    const [session] = await db.select().from(sessions).where(eq(sessions.sessionId, sessionId));
    return session || undefined;
  }

  async createPageView(pageView: InsertPageView): Promise<PageView> {
    const [created] = await db
      .insert(pageViews)
      .values(pageView)
      .returning();
    return created;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const [created] = await db
      .insert(events)
      .values(event)
      .returning();
    return created;
  }

  async getAnalyticsSummary(startDate?: Date, endDate?: Date) {
    // Build date filter condition
    let dateFilter;
    if (startDate && endDate) {
      dateFilter = sql`${sessions.startedAt} BETWEEN ${startDate.toISOString()} AND ${endDate.toISOString()}`;
    } else if (startDate) {
      dateFilter = gte(sessions.startedAt, startDate);
    }

    // Get basic counts
    const [sessionStats] = await db
      .select({
        totalSessions: count(sessions.id),
        avgDuration: sql<number>`COALESCE(AVG(${sessions.duration}), 0)`,
      })
      .from(sessions)
      .where(dateFilter);

    const [pageViewStats] = await db
      .select({
        totalPageViews: count(pageViews.id),
      })
      .from(pageViews)
      .leftJoin(sessions, eq(pageViews.sessionId, sessions.sessionId))
      .where(dateFilter ? sql`${sessions.startedAt} BETWEEN ${startDate?.toISOString()} AND ${endDate?.toISOString() || 'NOW'}` : undefined);

    const [eventStats] = await db
      .select({
        totalEvents: count(events.id),
      })
      .from(events)
      .leftJoin(sessions, eq(events.sessionId, sessions.sessionId))
      .where(dateFilter ? sql`${sessions.startedAt} BETWEEN ${startDate?.toISOString()} AND ${endDate?.toISOString() || 'NOW'}` : undefined);

    // Get top pages
    const topPages = await db
      .select({
        path: pageViews.path,
        views: count(pageViews.id),
      })
      .from(pageViews)
      .leftJoin(sessions, eq(pageViews.sessionId, sessions.sessionId))
      .where(dateFilter ? sql`${sessions.startedAt} BETWEEN ${startDate?.toISOString()} AND ${endDate?.toISOString() || 'NOW'}` : undefined)
      .groupBy(pageViews.path)
      .orderBy(desc(count(pageViews.id)))
      .limit(10);

    // Get top referrers (excluding empty/null referrers)
    const topReferrers = await db
      .select({
        referrer: sessions.referrer,
        sessions: count(sessions.id),
      })
      .from(sessions)
      .where(dateFilter ? 
        sql`${sessions.referrer} IS NOT NULL AND ${sessions.referrer} != '' AND ${sessions.startedAt} BETWEEN ${startDate?.toISOString()} AND ${endDate?.toISOString() || 'NOW'}` : 
        sql`${sessions.referrer} IS NOT NULL AND ${sessions.referrer} != ''`)
      .groupBy(sessions.referrer)
      .orderBy(desc(count(sessions.id)))
      .limit(10);

    // Get device breakdown (excluding null device types)
    const deviceBreakdown = await db
      .select({
        deviceType: sessions.deviceType,
        count: count(sessions.id),
      })
      .from(sessions)
      .where(dateFilter ? 
        sql`${sessions.deviceType} IS NOT NULL AND ${sessions.startedAt} BETWEEN ${startDate?.toISOString()} AND ${endDate?.toISOString() || 'NOW'}` : 
        sql`${sessions.deviceType} IS NOT NULL`)
      .groupBy(sessions.deviceType)
      .orderBy(desc(count(sessions.id)));

    return {
      totalSessions: Number(sessionStats.totalSessions) || 0,
      totalPageViews: Number(pageViewStats.totalPageViews) || 0,
      totalEvents: Number(eventStats.totalEvents) || 0,
      avgSessionDuration: Number(sessionStats.avgDuration) || 0,
      topPages: topPages.map(p => ({ 
        path: p.path, 
        views: Number(p.views) 
      })),
      topReferrers: topReferrers.filter(r => r.referrer).map(r => ({ 
        referrer: r.referrer!, 
        sessions: Number(r.sessions) 
      })),
      deviceBreakdown: deviceBreakdown.filter(d => d.deviceType).map(d => ({ 
        deviceType: d.deviceType!, 
        count: Number(d.count) 
      })),
    };
  }

  async getSessionsWithMetrics(limit = 100, offset = 0): Promise<Session[]> {
    return await db
      .select()
      .from(sessions)
      .orderBy(desc(sessions.startedAt))
      .limit(limit)
      .offset(offset);
  }
}

export const storage = new DatabaseStorage();
