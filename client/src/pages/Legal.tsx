import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface LegalPageProps {
  type: "privacy" | "terms" | "refund";
}

export default function Legal({ type }: LegalPageProps) {
  const [, setLocation] = useLocation();

  const content = {
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "November 2025",
      sections: [
        {
          heading: "Introduction",
          content: `Aakaar Career Consulting ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.`
        },
        {
          heading: "Information We Collect",
          content: `We may collect personal information that you voluntarily provide to us when you:
• Register for our services
• Fill out contact forms
• Subscribe to our newsletter
• Participate in our career counselling sessions
• Make payments for our services

This information may include:
• Name, email address, and phone number
• Educational background and career information
• Payment information (processed securely through Razorpay)
• Any other information you choose to provide`
        },
        {
          heading: "How We Use Your Information",
          content: `We use the information we collect to:
• Provide and maintain our career counselling services
• Process your transactions and send related information
• Send you updates about your sessions and our services
• Respond to your comments, questions, and requests
• Improve our website and services
• Send promotional communications (with your consent)`
        },
        {
          heading: "Information Sharing",
          content: `We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except:
• To trusted service providers who assist us in operating our website and conducting our business
• When required by law or to protect our rights
• In connection with a merger, acquisition, or sale of assets`
        },
        {
          heading: "Data Security",
          content: `We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.`
        },
        {
          heading: "Your Rights",
          content: `You have the right to:
• Access the personal information we hold about you
• Request correction of inaccurate information
• Request deletion of your personal information
• Opt-out of marketing communications
• Withdraw consent where applicable`
        },
        {
          heading: "Contact Us",
          content: `If you have questions about this Privacy Policy, please contact us at:
Email: mohini.aakarshapinglives@gmail.com
Phone: 9826912569
Location: Bhopal, Madhya Pradesh`
        }
      ]
    },
    terms: {
      title: "Terms of Service",
      lastUpdated: "November 2025",
      sections: [
        {
          heading: "Acceptance of Terms",
          content: `By accessing and using the services provided by Aakaar Career Consulting, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.`
        },
        {
          heading: "Services Description",
          content: `Aakaar Career Consulting provides career counselling, psychometric assessments, guidance on studying abroad, CV building, and related services. Our services are designed to help students and professionals make informed career decisions.`
        },
        {
          heading: "User Responsibilities",
          content: `When using our services, you agree to:
• Provide accurate and complete information
• Attend scheduled sessions on time
• Treat our counsellors and staff with respect
• Not share your account credentials with others
• Use our services only for lawful purposes`
        },
        {
          heading: "Payment Terms",
          content: `• All payments are processed securely through Razorpay
• Prices are displayed in Indian Rupees (INR)
• Payment is required before the commencement of services
• All fees are non-refundable unless specified in our Refund Policy`
        },
        {
          heading: "Intellectual Property",
          content: `All content on our website, including text, graphics, logos, and software, is the property of Aakaar Career Consulting and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.`
        },
        {
          heading: "Limitation of Liability",
          content: `Aakaar Career Consulting provides guidance and recommendations based on assessments and expertise. However, we do not guarantee specific career outcomes. Our services are advisory in nature, and final decisions rest with the client.

We shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.`
        },
        {
          heading: "Modification of Terms",
          content: `We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services constitutes acceptance of the modified terms.`
        },
        {
          heading: "Governing Law",
          content: `These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bhopal, Madhya Pradesh.`
        }
      ]
    },
    refund: {
      title: "Refund Policy",
      lastUpdated: "November 2025",
      sections: [
        {
          heading: "Overview",
          content: `At Aakaar Career Consulting, we strive to provide high-quality career counselling services. This Refund Policy outlines the terms and conditions for refunds.`
        },
        {
          heading: "Eligibility for Refunds",
          content: `Refunds may be considered in the following situations:
• Cancellation made at least 48 hours before the scheduled session
• Technical issues on our end that prevent service delivery
• Duplicate payments made in error
• Services not delivered as described`
        },
        {
          heading: "Non-Refundable Cases",
          content: `Refunds will NOT be provided in the following cases:
• Cancellations made less than 48 hours before the scheduled session
• No-show for scheduled sessions without prior notice
• Dissatisfaction with career recommendations (as these are advisory in nature)
• Completed sessions or services
• Partial use of package services`
        },
        {
          heading: "Refund Process",
          content: `To request a refund:
1. Email us at mohini.aakarshapinglives@gmail.com with your booking details
2. Include your reason for requesting a refund
3. Provide your payment receipt or transaction ID

We will review your request within 5-7 business days and notify you of the outcome.`
        },
        {
          heading: "Refund Timeline",
          content: `If your refund is approved:
• Refunds will be processed within 7-10 business days
• The amount will be credited to the original payment method
• Bank processing times may vary`
        },
        {
          heading: "Rescheduling",
          content: `Instead of a refund, you may choose to reschedule your session:
• Rescheduling is allowed up to 24 hours before the session
• Sessions can be rescheduled once without any additional charge
• Subsequent rescheduling may incur a fee`
        },
        {
          heading: "Contact for Refunds",
          content: `For refund-related queries, please contact us:
Email: mohini.aakarshapinglives@gmail.com
Phone: 9826912569

We aim to resolve all refund requests fairly and promptly.`
        }
      ]
    }
  };

  const pageContent = content[type];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-8"
            data-testid="button-back-home"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          <div className="bg-card rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold gradient-text mb-2" data-testid="legal-title">
              {pageContent.title}
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
              Last updated: {pageContent.lastUpdated}
            </p>

            <div className="space-y-8">
              {pageContent.sections.map((section, index) => (
                <section key={index}>
                  <h2 className="text-xl font-semibold mb-3 text-foreground">
                    {section.heading}
                  </h2>
                  <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
