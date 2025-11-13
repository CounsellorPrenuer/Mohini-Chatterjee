import { type InsertServicePackage } from "@shared/schema";

export const defaultServicePackages: InsertServicePackage[] = [
  {
    name: "Career Discovery Session",
    description: "One-on-one personalized career counseling session to explore your strengths, interests, and career options",
    price: 250000, // ₹2500 in paise
    duration: "90 minutes",
    features: [
      "Comprehensive aptitude and interest assessment",
      "Personalized career recommendations",
      "Stream and course selection guidance",
      "One-on-one consultation with expert counselor",
      "Detailed career report"
    ],
    category: ["college_graduates", "working_professionals"],
    isActive: true
  },
  {
    name: "Student Career Guidance Package",
    description: "Complete career planning package for students in 8th-12th grade",
    price: 500000, // ₹5000 in paise
    duration: "3 sessions",
    features: [
      "Subject and stream selection counseling",
      "Career aptitude testing",
      "College and course recommendations",
      "Study plan development",
      "3 follow-up sessions over 6 months",
      "Parent counseling session included"
    ],
    category: ["8th_9th_students", "10th_12th_students"],
    isActive: true
  },
  {
    name: "College Admission Counseling",
    description: "Expert guidance for college admissions and entrance exam preparation",
    price: 800000, // ₹8000 in paise
    duration: "5 sessions",
    features: [
      "College selection strategy",
      "Application review and optimization",
      "Statement of Purpose guidance",
      "Interview preparation",
      "Entrance exam planning",
      "Scholarship guidance"
    ],
    category: ["10th_12th_students", "college_graduates"],
    isActive: true
  },
  {
    name: "Professional Career Transition",
    description: "Comprehensive support for career change and professional development",
    price: 1200000, // ₹12000 in paise
    duration: "8 sessions",
    features: [
      "Career assessment and gap analysis",
      "Industry transition strategy",
      "Resume and LinkedIn optimization",
      "Interview coaching",
      "Networking strategies",
      "Personal branding guidance",
      "3 months follow-up support"
    ],
    category: ["working_professionals"],
    isActive: true
  },
  {
    name: "Corporate Workshop - Team Building",
    description: "Interactive workshop for corporate teams focusing on career development and team dynamics",
    price: 2500000, // ₹25000 in paise
    duration: "Full day (6 hours)",
    features: [
      "Customized workshop content",
      "Leadership development sessions",
      "Team building activities",
      "Career growth planning",
      "Psychological wellbeing sessions",
      "Post-workshop report and recommendations"
    ],
    category: ["corporates"],
    isActive: true
  },
  {
    name: "School/College Career Seminar",
    description: "Comprehensive career awareness seminar for educational institutions",
    price: 1500000, // ₹15000 in paise
    duration: "Half day (3 hours)",
    features: [
      "Career awareness sessions",
      "Stream selection guidance",
      "Industry trends overview",
      "Q&A with students and parents",
      "Interactive activities",
      "Resource materials for participants"
    ],
    category: ["schools_colleges"],
    isActive: true
  },
  {
    name: "Parent Counseling Session",
    description: "Guidance for parents on supporting their children's educational and career decisions",
    price: 300000, // ₹3000 in paise
    duration: "60 minutes",
    features: [
      "Understanding child's strengths and interests",
      "Parental role in career planning",
      "Communication strategies",
      "Supporting academic decisions",
      "Managing expectations",
      "Follow-up email support"
    ],
    category: ["parents"],
    isActive: true
  }
];
