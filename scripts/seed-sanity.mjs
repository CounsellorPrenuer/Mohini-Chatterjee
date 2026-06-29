import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const token = process.env.SANITY_EDITOR_TOKEN;
if (!token) throw new Error("SANITY_EDITOR_TOKEN is required");

const configPath = join(dirname(fileURLToPath(import.meta.url)), "..", "client", "src", "lib", "config.ts");
const configText = readFileSync(configPath, "utf8");
const projectIdMatch = configText.match(/SANITY_PROJECT_ID = "([^"]+)"/);
const projectId = projectIdMatch?.[1];
if (!projectId || projectId === "PLACEHOLDER_SANITY_ID") {
  throw new Error("Set SANITY_PROJECT_ID in client/src/lib/config.ts before seeding");
}

const client = createClient({
  projectId,
  dataset: "production",
  apiVersion: "2026-06-01",
  token,
  useCdn: false,
});

async function uploadFromUrl(url, label) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch image: ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename: `${label}.jpg` });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: label };
}

const [careerImage, workshopImage, admissionImage, corporateImage, blogImage] = await Promise.all([
  uploadFromUrl("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80", "Career guidance"),
  uploadFromUrl("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80", "Workshops"),
  uploadFromUrl("https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=80", "Admission guidance"),
  uploadFromUrl("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80", "Corporate solutions"),
  uploadFromUrl("https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=900&q=80", "Career blog"),
]);

const standardPlans = [
  ["pkg-1", "Discover", "8-10", 5500, ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Live webinar invites"]],
  ["pkg-2", "Discover Plus+", "8-10", 15000, ["Psychometric assessments", "8 career counselling sessions (1/year)", "Custom reports & study abroad guidance", "CV building"]],
  ["pkg-3", "Achieve Online", "10-12", 5999, ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"]],
  ["pkg-4", "Achieve Plus+", "10-12", 10599, ["Psychometric assessment", "4 career counselling sessions", "Custom reports & study abroad guidance", "CV reviews"]],
  ["pkg-5", "Ascend Online", "college", 6499, ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"]],
  ["pkg-6", "Ascend Plus+", "college", 10599, ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"]],
  ["mp-3", "Ascend Online", "working", 6499, ["Psychometric assessment", "1 career counselling session", "Lifetime Knowledge Gateway access", "Pre-recorded webinars"]],
  ["mp-2", "Ascend Plus+", "working", 10599, ["Psychometric assessment", "3 career counselling sessions", "Certificate/online course info", "CV reviews for jobs"]],
];

const customPlans = [
  ["career-report", "Career Report", 1500, "Get a detailed report of your psychometric assessment for a scientific analysis of your interests."],
  ["career-report-counselling", "Career Report + Career Counselling", 3000, "Connect with India's top career coaches to analyse your psychometric report and shortlist the top three career paths."],
  ["knowledge-gateway", "Knowledge Gateway + Career Helpline Access", 100, "Unlock holistic information on your career paths and get direct access to Mentoria's experts."],
  ["one-to-one-session", "One-to-One Session with a Career Expert", 3500, "Resolve your career queries through a one-on-one session with an expert from your chosen field."],
  ["college-admission-planning", "College Admission Planning", 3000, "Get unbiased recommendations and details on your future college options in India and abroad."],
  ["exam-stress-management", "Exam Stress Management", 1000, "Get expert guidance on tackling exam stress, planning your study schedule, and revision tips."],
  ["cap-100", "College Admissions Planner - 100 (CAP-100)", 199, "Rs.199 for a ranked list of the top 100 colleges in your course based on verified cut-offs."],
];

const block = (text) => ({
  _type: "block",
  _key: crypto.randomUUID().slice(0, 12),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: crypto.randomUUID().slice(0, 12), text, marks: [] }],
});

const planImages = [careerImage, workshopImage, admissionImage, corporateImage];

const documents = [
  ...standardPlans.map(([planId, title, subgroup, price, features], order) => ({
    _id: `standard-plan-${planId}`,
    _type: "standardPlan",
    planId, title, subgroup, price, features, order: order + 1,
    image: planImages[order % planImages.length],
  })),
  ...customPlans.map(([planId, title, price, description], order) => ({
    _id: `custom-plan-${planId}`,
    _type: "customPlan",
    planId, title, price, description, order: order + 1,
    image: planImages[order % planImages.length],
  })),
  {
    _id: "service-career-guidance", _type: "services", title: "Career Guidance",
    description: "Career assessments using psychometric tools, personalized counselling sessions, course and career path guidance, and career transition support.",
    link: "#services", image: careerImage, order: 1,
  },
  {
    _id: "service-workshops", _type: "services", title: "Workshops & Seminars",
    description: "Career awareness sessions, corporate wellbeing workshops, soft skills development, and mental health awareness programs.",
    link: "#services", image: workshopImage, order: 2,
  },
  {
    _id: "service-admission", _type: "services", title: "Admission Guidance",
    description: "Higher education guidance, stream selection and course mapping, interview preparation, and mentorship until admission.",
    link: "#services", image: admissionImage, order: 3,
  },
  {
    _id: "service-corporate", _type: "services", title: "Corporate Solutions",
    description: "Employee engagement programs, leadership development training, career transition support, and customized corporate workshops.",
    link: "#services", image: corporateImage, order: 4,
  },
  {
    _id: "testimonial-1", _type: "testimonials", name: "Ananya Gupta", role: "Class 12 Student",
    quote: "Before meeting Ms. Mohini, I was completely confused about whether to take up Science or Commerce. The psychometric assessment gave me so much clarity.",
    rating: 5, image: careerImage, order: 1,
  },
  {
    _id: "testimonial-2", _type: "testimonials", name: "Rahul Mehta", role: "Engineering Graduate",
    quote: "Ms. Mohini helped me identify my strengths and guided me toward higher studies abroad. The admission guidance were spot-on.",
    rating: 5, image: workshopImage, order: 2,
  },
  {
    _id: "testimonial-3", _type: "testimonials", name: "Mrs. Priya Nair", role: "Parent",
    quote: "Ms. Mohini's session gave us a roadmap and removed all the stress around decision-making for our child.",
    rating: 5, image: admissionImage, order: 3,
  },
  {
    _id: "blog-career-myths", _type: "blogPost", title: "5 Common Career Myths Students Believe – And The Truth Behind Them",
    slug: { _type: "slug", current: "career-myths-students-truth" },
    excerpt: "Debunking popular misconceptions that often lead students astray in their career planning journey.",
    author: "Mohini Chatterjee", publishedAt: "2026-06-01T09:00:00.000Z", featured: true, image: blogImage,
    body: [
      block("Many students navigate their career decisions based on outdated beliefs and misconceptions."),
      block("While passion is important, skills, market demand, and personal values should also guide your decisions."),
      block("Career pivots are increasingly common and often lead to greater satisfaction when done thoughtfully."),
    ],
  },
  {
    _id: "blog-psychology", _type: "blogPost", title: "How Psychology Can Transform Your Career Decisions",
    slug: { _type: "slug", current: "psychology-career-decisions" },
    excerpt: "Understanding the psychological factors that influence career choices and how to leverage them for better outcomes.",
    author: "Mohini Chatterjee", publishedAt: "2026-05-15T09:00:00.000Z", featured: false, image: careerImage,
    body: [
      block("Psychological assessments help identify your core values, motivations, and working styles."),
      block("Understanding cognitive biases helps make more objective career decisions."),
    ],
  },
  {
    _id: "blog-soft-skills", _type: "blogPost", title: "The Rise of Soft Skills in the AI Era",
    slug: { _type: "slug", current: "soft-skills-ai-era" },
    excerpt: "Why emotional intelligence, creativity, and communication are becoming more valuable than ever.",
    author: "Mohini Chatterjee", publishedAt: "2026-05-01T09:00:00.000Z", featured: false, image: workshopImage,
    body: [
      block("As artificial intelligence automates many technical tasks, human-centric skills become more valuable than ever."),
      block("Emotional intelligence is crucial for leadership and teamwork in the modern workplace."),
    ],
  },
];

let transaction = client.transaction();
for (const document of documents) transaction = transaction.createOrReplace(document);
await transaction.commit();

console.log(`Seeded ${documents.length} Sanity documents to project ${projectId}.`);
