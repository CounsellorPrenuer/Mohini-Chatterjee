import type { BlogPost, CmsContent } from "./sanity";

function block(text: string) {
  return {
    _type: "block",
    _key: text.slice(0, 12),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: "span", text, marks: [] }],
  };
}

const fallbackBlogPosts: BlogPost[] = [
  {
    _id: "fallback-blog-1",
    title: "5 Common Career Myths Students Believe – And The Truth Behind Them",
    slug: "career-myths-students-truth",
    excerpt: "Debunking popular misconceptions that often lead students astray in their career planning journey.",
    author: "Mohini Chatterjee",
    publishedAt: "2026-06-01T09:00:00.000Z",
    featured: true,
    body: [
      block("Many students navigate their career decisions based on outdated beliefs and misconceptions. Here are five of the most common myths and the reality behind them."),
      block("Myth 1: Follow Your Passion is always the right advice. While passion is important, skills, market demand, and personal values should also guide your decisions."),
      block("Myth 2: A degree guarantees success. Education is crucial, but practical skills, networking, and continuous learning are equally important in today's job market."),
      block("Myth 3: Career changes are career failures. Career pivots are increasingly common and often lead to greater satisfaction when done thoughtfully."),
    ],
  },
  {
    _id: "fallback-blog-2",
    title: "How Psychology Can Transform Your Career Decisions",
    slug: "psychology-career-decisions",
    excerpt: "Understanding the psychological factors that influence career choices and how to leverage them for better outcomes.",
    author: "Mohini Chatterjee",
    publishedAt: "2026-05-15T09:00:00.000Z",
    featured: false,
    body: [
      block("Understanding the psychological factors that influence our career choices can lead to more fulfilling professional lives."),
      block("Psychological assessments help identify your core values, motivations, and working styles, leading to better career alignment."),
      block("We all have cognitive biases that can cloud our judgment. Understanding these helps make more objective career decisions."),
    ],
  },
  {
    _id: "fallback-blog-3",
    title: "The Rise of Soft Skills in the AI Era",
    slug: "soft-skills-ai-era",
    excerpt: "Why emotional intelligence, creativity, and communication are becoming more valuable than ever.",
    author: "Mohini Chatterjee",
    publishedAt: "2026-05-01T09:00:00.000Z",
    featured: false,
    body: [
      block("As artificial intelligence automates many technical tasks, human-centric skills become more valuable than ever."),
      block("Emotional intelligence—the ability to understand and manage emotions—is crucial for leadership and teamwork."),
      block("While AI can process data, human creativity in solving complex, nuanced problems remains irreplaceable."),
    ],
  },
];

export const CMS_FALLBACK: CmsContent = {
  standardPlans: [
    { _id: "fallback-pkg-1", planId: "pkg-1", title: "Discover", subgroup: "8-10", price: 5500, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Live webinar invites"] },
    { _id: "fallback-pkg-2", planId: "pkg-2", title: "Discover Plus+", subgroup: "8-10", price: 15000, features: ["Psychometric assessments", "8 career counselling sessions (1/year)", "Custom reports & study abroad guidance", "CV building"] },
    { _id: "fallback-pkg-3", planId: "pkg-3", title: "Achieve Online", subgroup: "10-12", price: 5999, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
    { _id: "fallback-pkg-4", planId: "pkg-4", title: "Achieve Plus+", subgroup: "10-12", price: 10599, features: ["Psychometric assessment", "4 career counselling sessions", "Custom reports & study abroad guidance", "CV reviews"] },
    { _id: "fallback-pkg-5", planId: "pkg-5", title: "Ascend Online", subgroup: "college", price: 6499, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
    { _id: "fallback-pkg-6", planId: "pkg-6", title: "Ascend Plus+", subgroup: "college", price: 10599, features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"] },
    { _id: "fallback-mp-3", planId: "mp-3", title: "Ascend Online", subgroup: "working", price: 6499, features: ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"] },
    { _id: "fallback-mp-2", planId: "mp-2", title: "Ascend Plus+", subgroup: "working", price: 10599, features: ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"] },
  ],
  customPlans: [
    { _id: "fallback-career-report", planId: "career-report", title: "Career Report", price: 1500, description: "Get a detailed report of your psychometric assessment for a scientific analysis of your interests. Find out where your interests lie and which future paths you can potentially consider." },
    { _id: "fallback-career-report-counselling", planId: "career-report-counselling", title: "Career Report + Career Counselling", price: 3000, description: "Connect with India's top career coaches to analyse your psychometric report and shortlist the top three career paths you're most likely to enjoy and excel at." },
    { _id: "fallback-knowledge-gateway", planId: "knowledge-gateway", title: "Knowledge Gateway + Career Helpline Access", price: 100, description: "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline." },
    { _id: "fallback-one-to-one-session", planId: "one-to-one-session", title: "One-to-One Session with a Career Expert", price: 3500, description: "Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field." },
    { _id: "fallback-college-admission-planning", planId: "college-admission-planning", title: "College Admission Planning", price: 3000, description: "Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner." },
    { _id: "fallback-exam-stress-management", planId: "exam-stress-management", title: "Exam Stress Management", price: 1000, description: "Get expert guidance on tackling exam stress, planning your study schedule, revision tips and more from India's top educators." },
    { _id: "fallback-cap-100", planId: "cap-100", title: "College Admissions Planner - 100 (CAP-100)", price: 199, description: "Rs.199 for a ranked list of the top 100 colleges in your course. Get an expert-curated list of colleges based on verified cut-offs." },
  ],
  blogPosts: fallbackBlogPosts,
  testimonials: [
    { _id: "fallback-testimonial-1", name: "Ananya Gupta", role: "Class 12 Student", quote: "Before meeting Ms. Mohini, I was completely confused about whether to take up Science or Commerce. The psychometric assessment gave me so much clarity. Today, I'm confidently preparing for my dream career in law.", rating: 5 },
    { _id: "fallback-testimonial-2", name: "Rahul Mehta", role: "Engineering Graduate", quote: "I had finished my degree but wasn't sure about my next step. Ms. Mohini helped me identify my strengths and guided me toward higher studies abroad. The admission guidance were spot-on.", rating: 5 },
    { _id: "fallback-testimonial-3", name: "Mrs. Priya Nair", role: "Parent", quote: "As a parent, I wanted my child to choose a career path based on strengths, not peer pressure. Ms. Mohini's session gave us a roadmap and removed all the stress around decision-making.", rating: 5 },
    { _id: "fallback-testimonial-4", name: "Amit Sharma", role: "IT Professional", quote: "I was stuck in the same role for years. Through career coaching, I discovered transferable skills and redesigned my resume. Within 3 months, I got a promotion into a leadership role.", rating: 5 },
  ],
  services: [
    { _id: "fallback-service-1", title: "Career Guidance", description: "Career assessments using psychometric tools, personalized counselling sessions, course and career path guidance, and career transition support.", link: "#services" },
    { _id: "fallback-service-2", title: "Workshops & Seminars", description: "Career awareness sessions, corporate wellbeing workshops, soft skills development, and mental health awareness programs.", link: "#services" },
    { _id: "fallback-service-3", title: "Admission Guidance", description: "Higher education guidance, stream selection and course mapping, interview preparation, and mentorship until admission.", link: "#services" },
    { _id: "fallback-service-4", title: "Corporate Solutions", description: "Employee engagement programs, leadership development training, career transition support, and customized corporate workshops.", link: "#services" },
  ],
};
