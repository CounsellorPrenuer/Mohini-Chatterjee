# Aakaar Career Consulting - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium consulting firms (McKinsey, Bain) and modern professional service sites (Webflow, Notion careers pages), adapted with a sophisticated pink palette. Focus on trust-building through elegant minimalism and strategic use of whitespace.

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- Hot Pink: #F900BF / 316 100% 49% (primary brand color, buttons, CTAs)
- Light Pink: #FF85B3 / 337 100% 76% (secondary highlights, accents)

**Neutrals:**
- Pure White: 0 0% 100% (page and card backgrounds)
- Dark Pink: 316 100% 35% (body text on white backgrounds)
- Medium Pink: 316 40% 45% (secondary/muted text)

**Text Rules:**
- On pink backgrounds (#F900BF or #FF85B3): Always use white text (#FFFFFF)
- On white backgrounds: Use dark pink for readable body text

**Dark Mode:**
- Dark Background: 316 40% 12% (deep pink background)
- White Text: 0 0% 100% (primary text in dark mode)
- Pink Accents: Same hot pink and light pink as light mode

### B. Typography

**Font Families:**
- Headings: 'Playfair Display' (serif, elegant)
- Body: 'Inter' (sans-serif, readable)
- Accents: 'Inter' Medium for emphasis

**Scale:**
- Hero Headline: text-5xl md:text-6xl lg:text-7xl, font-serif
- Section Headings: text-3xl md:text-4xl, font-serif
- Subheadings: text-xl md:text-2xl, font-medium
- Body: text-base md:text-lg, leading-relaxed
- Captions: text-sm, tracking-wide, uppercase

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm.

**Container Strategy:**
- Full-width sections with inner max-w-7xl for most content
- Text-focused sections: max-w-4xl
- Hero: Full width with contained text overlay

**Section Padding:** py-16 md:py-24 lg:py-32 for generous breathing room

### D. Component Library

**Navigation:**
- Sticky header with subtle backdrop blur
- Logo left, navigation center-right
- Soft rose background (340 45% 88%) with shadow-sm
- Links in deep mauve, underline animation on hover
- CTA button in outline style with soft pink border

**Hero Section:**
- Full-width background image (80vh on desktop, 70vh mobile)
- Overlay: gradient from transparent to warm white at bottom
- Content positioned left-aligned, max-w-2xl
- Headline in Playfair Display, deep mauve
- Subheadline in Inter, medium gray
- Dual CTAs: Primary filled (deep mauve bg), Secondary outline with blur backdrop

**Services Grid:**
- 3 columns on desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Cards with light blush background, rounded-2xl
- Subtle hover: translate-y lift (-1 or -2 units)
- Icon space (use Heroicons), title, description
- Padding: p-8

**Process Timeline:**
- Vertical on mobile, horizontal on desktop
- Connected with soft pink line
- Circular numbered badges (dusty pink bg)
- Text content with step title and description
- 4-5 steps typical

**Testimonials:**
- 2-column grid on desktop
- Cards with warm white background, border in soft rose
- Client photo (rounded-full, w-16 h-16)
- Quote in serif italic
- Name and role in smaller text

**Team/About Section:**
- Single column with image placement alternating left/right
- Image rounded-3xl with soft shadow
- Text content max-w-prose
- Professional photo with warm tone treatment

**Contact/CTA Section:**
- Two-column: Form left (60%), Info right (40%)
- Form fields with light blush background, deep mauve focus rings
- Submit button: deep mauve background with hover state
- Contact info includes: email, phone, office hours, response time

**Footer:**
- Three-column on desktop: Brand/About, Quick Links, Newsletter
- Soft rose background with deep mauve text
- Newsletter input with inline submit button
- Social icons in circular dusty pink containers

### E. Interaction Design

**Micro-interactions:** Minimal, subtle only
- Button hover: slight scale (1.02) and shadow increase
- Card hover: gentle lift (-translate-y-1)
- Link underline: grow from center
- NO elaborate animations, NO parallax, NO scroll triggers

**Transitions:** transition-all duration-300 ease-in-out for consistency

## Images

**Hero Image:**
- Professional consulting scene: diverse team collaborating in modern office with soft natural lighting
- Warm tones, slightly desaturated to blend with pink palette
- High-resolution, optimistic yet professional mood
- Position: Cover full section with object-center

**Additional Images:**
- Team section: Professional headshots with consistent warm lighting, minimal background
- About/Story section: Candid workspace photo showing expertise and approachability
- Testimonial avatars: Client headshots, circular crop
- All images should have warm color grading to harmonize with pink theme

**Image Treatment:** Apply subtle overlay (soft rose tint at 5-10% opacity) to maintain color consistency

## Page Structure

1. **Header/Navigation** - Sticky, translucent
2. **Hero** - Image-based, 80vh, strong value prop
3. **Introduction** - Single column, centered text (max-w-3xl)
4. **Services** - 3-column grid showcasing offerings
5. **Process** - Timeline/steps visualization
6. **Results/Impact** - Stats or case studies, 3-column metrics
7. **Testimonials** - 2-column social proof
8. **About/Team** - Story section with founder/team info
9. **Final CTA** - Contact form with context
10. **Footer** - Comprehensive, 3-column

**Critical:** Each section fully designed with 5-8 total sections creating a complete, professional experience. No sparse layouts—every component enriched with supporting elements for depth and credibility.