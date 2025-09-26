# Aakaar Career Consulting Website

## Overview

Aakaar is a comprehensive career consulting website built for Ms. Mohini Chatterjee, a psychological consultant and career development expert. The platform serves students, parents, professionals, schools, colleges, and corporates by providing career guidance, admission counseling, workshops, and psychological wellbeing services. The application features a modern, responsive design with a full-stack architecture supporting content management, contact forms, testimonials, and blog functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component development
- **Routing**: Wouter for lightweight client-side routing with two main routes (Home and Admin)
- **Styling**: Tailwind CSS with custom design system featuring pink/purple gradient themes and shadcn/ui components
- **State Management**: TanStack React Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation
- **UI Components**: Radix UI primitives with custom shadcn/ui component layer for accessibility and consistency

### Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful API with dedicated routes for blog posts, testimonials, and contact management
- **Development Setup**: Vite for fast development builds and hot module replacement
- **Build Process**: ESBuild for production server bundling

### Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless database hosting
- **ORM**: Drizzle ORM for type-safe database queries and schema management
- **Schema**: Well-defined tables for users, blog posts, testimonials, and contacts with UUID primary keys
- **Migrations**: Drizzle Kit for database schema versioning and deployment

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **Admin Access**: Basic authentication system for admin panel access
- **Route Protection**: Server-side route protection for admin endpoints

### External Dependencies
- **Database Hosting**: Neon serverless PostgreSQL for scalable database management
- **Asset Management**: Local asset storage with Vite asset pipeline for images and static files
- **Email/Contact**: Contact form system storing inquiries in database for admin review
- **Development Tools**: Replit-specific plugins for development environment integration

### Content Management System
- **Blog Management**: Full CRUD operations for blog posts with draft/published status
- **Testimonial System**: Approval workflow for user-submitted testimonials
- **Contact Management**: Inquiry tracking with status management (new/responded/closed)
- **Admin Dashboard**: Comprehensive admin interface for content and inquiry management

### Design System
- **Color Palette**: Pink and purple gradients with neutral base colors for professional appearance
- **Typography**: Inter for body text and Merriweather for headings to balance readability and elegance
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities
- **Animation**: CSS animations and transitions for smooth user interactions
- **Accessibility**: ARIA labels and semantic HTML structure throughout the application