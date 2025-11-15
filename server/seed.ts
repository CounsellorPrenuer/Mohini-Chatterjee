import { type InsertServicePackage } from "@shared/schema";

export const defaultServicePackages: InsertServicePackage[] = [
  {
    name: "Discover",
    description: "STANDARD",
    price: 550000, // ₹5,500 in paise
    duration: "",
    features: [
      "Psychometric assessment to measure your interests",
      "1 career counselling session with Mentoria's expert career coaches",
      "Lifetime access to Knowledge Gateway",
      "Invites to live webinars by industry experts"
    ],
    category: "8th-9th-students",
    isActive: true
  },
  {
    name: "Discover plus+",
    description: "PREMIUM",
    price: 1500000, // ₹15,000 in paise
    duration: "",
    features: [
      "Psychometric assessments to measure your interests",
      "personality and abilities",
      "8 career counselling sessions (1 every year) with Mentoria's expert career coaches until graduation",
      "Lifetime access to Knowledge Gateway",
      "Invites to live webinars by industry experts",
      "Customised reports after each session with education pathways",
      "Guidance on studying abroad",
      "CV building during internships/graduation"
    ],
    category: "8th-9th-students",
    isActive: true
  },
  {
    name: "Achieve Online",
    description: "STANDARD",
    price: 599900, // ₹5,999 in paise
    duration: "",
    features: [
      "Psychometric assessment to measure your interests",
      "personality and abilities",
      "1 career counselling session",
      "Lifetime access to Knowledge Gateway",
      "Pre-recorded webinars by industry experts"
    ],
    category: "10th-12th-students",
    isActive: true
  },
  {
    name: "Achieve Plus+",
    description: "STANDARD",
    price: 1059900, // ₹10,599 in paise
    duration: "",
    features: [
      "Psychometric assessment to measure your interests",
      "personality and abilities",
      "1 career counselling session",
      "Lifetime access to Knowledge Gateway",
      "Pre-recorded webinars by industry experts"
    ],
    category: "10th-12th-students",
    isActive: true
  },
  {
    name: "Ascend Online",
    description: "STANDARD",
    price: 649900, // ₹6,499 in paise
    duration: "",
    features: [
      "Psychometric assessment to measure your interests",
      "personality and abilities",
      "1 career counselling session",
      "Lifetime access to Knowledge Gateway",
      "Pre-recorded webinars by industry experts"
    ],
    category: "college-graduates",
    isActive: true
  },
  {
    name: "Ascend Online",
    description: "STANDARD",
    price: 649900, // ₹6,499 in paise
    duration: "",
    features: [
      "Psychometric assessment to measure your interests",
      "personality and abilities",
      "1 career counselling session",
      "Lifetime access to Knowledge Gateway",
      "Pre-recorded webinars by industry experts"
    ],
    category: "working-professionals",
    isActive: true
  },
  {
    name: "Ascend Plus+",
    description: "PREMIUM",
    price: 1059900, // ₹10,599 in paise
    duration: "",
    features: [
      "Psychometric assessment to measure your interests",
      "personality and abilities",
      "3 career counselling sessions",
      "Lifetime access to Knowledge Gateway",
      "Attend live webinars by industry experts",
      "Customised reports after each session with information on certificate/online courses",
      "Guidance on studying abroad",
      "CV reviews for job application"
    ],
    category: "college-graduates",
    isActive: true
  },
  {
    name: "Ascend Plus+",
    description: "PREMIUM",
    price: 1059900, // ₹10,599 in paise
    duration: "",
    features: [
      "Psychometric assessment to measure your interests",
      "personality and abilities",
      "3 career counselling sessions",
      "Lifetime access to Knowledge Gateway",
      "Attend live webinars by industry experts",
      "Customised reports after each session with information on certificate/online courses",
      "Guidance on studying abroad",
      "CV reviews for job application"
    ],
    category: "working-professionals",
    isActive: true
  }
];
