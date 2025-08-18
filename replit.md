# TDA Solutions

## Overview

This is a modern full-stack web application for TDA Solutions (شركة التطور والتسارع التقنية), a Saudi technology company. The application is a business website showcasing the company's services, portfolio, and providing a contact form for potential clients. It features a responsive design with Arabic language support, modern UI components, and a professional layout that highlights the company's expertise in software development, UI/UX design, branding, and technical support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built with React 18 using TypeScript and follows a component-based architecture. The application uses Vite as the build tool and development server, providing fast hot module replacement and optimized production builds. The UI is built with shadcn/ui components based on Radix UI primitives, styled with Tailwind CSS for a consistent design system. The application supports Arabic language (RTL layout) and uses custom CSS variables for theming with a professional color scheme.

### Backend Architecture
The server is implemented using Express.js with TypeScript, following a modular route-based architecture. The application uses an in-memory storage system for contacts with a simple interface that can be easily extended to support database operations. The server implements error handling middleware and request logging for debugging and monitoring purposes.

### Form Management and Validation
Form handling is implemented using React Hook Form with Zod schema validation. The contact form validates user input on both client and server sides, ensuring data integrity and providing meaningful error messages in Arabic. Form submissions are handled asynchronously with loading states and success/error feedback through toast notifications.

### Component Structure
The application follows a modular component structure with reusable UI components in the `/components/ui` directory and page-specific components for each section of the website. Components are designed to be responsive and follow accessibility best practices. The main page is composed of multiple sections including hero, about, services, portfolio, and contact sections.

### Styling and Theming
The application uses a comprehensive design system with CSS custom properties for colors, spacing, and typography. Tailwind CSS provides utility classes for responsive design and component styling. The design supports both light and dark themes and uses custom fonts including Cairo for Arabic text and Inter for English content.

### Development Tools and Configuration
The project uses TypeScript for type safety across both frontend and backend code. ESLint and Prettier configurations ensure code quality and consistency. The build process includes separate configurations for client and server builds, with the client built using Vite and the server using esbuild for optimal performance.

## External Dependencies

### UI and Styling Libraries
- **Radix UI**: Provides accessible, unstyled UI components as the foundation for the design system
- **Tailwind CSS**: Utility-first CSS framework for responsive design and component styling
- **class-variance-authority**: Utility for creating variant-based component APIs
- **clsx**: Utility for constructing className strings conditionally

### Form Management
- **React Hook Form**: Performant form library with minimal re-renders and easy validation
- **@hookform/resolvers**: Validation resolvers for React Hook Form, specifically Zod integration

### Data Fetching and State Management
- **TanStack Query (React Query)**: Server state management for data fetching, caching, and synchronization
- **Wouter**: Lightweight client-side routing library for navigation

### Database and ORM
- **Drizzle ORM**: Type-safe SQL ORM with strong TypeScript integration
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon database connections
- **Drizzle Kit**: CLI companion for schema management and migrations

### Validation and Schema
- **Zod**: TypeScript-first schema validation library for runtime type checking
- **drizzle-zod**: Integration between Drizzle ORM and Zod for schema validation

### Development Tools
- **Vite**: Fast build tool and development server with hot module replacement
- **TypeScript**: Static type checking for enhanced developer experience and code reliability
- **ESBuild**: Fast JavaScript bundler for server-side code compilation

### Utility Libraries
- **date-fns**: Modern JavaScript date utility library for date manipulation and formatting
- **nanoid**: Small, secure, URL-friendly unique string ID generator
- **lucide-react**: Beautiful and customizable SVG icons for React applications

### Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions, enabling persistent user sessions

## Recent Updates

### Mobile Optimization and Responsive Design (January 2025)
- Enhanced mobile responsiveness with optimized breakpoints and spacing
- Created mobile-specific components: MobileMenu, MobileOptimizedNavbar, MobileResponsiveGrid  
- Added touch-friendly button sizes and interaction areas (min 44px)
- Implemented responsive text sizing with clamp() for better mobile readability
- Optimized grid layouts for mobile: single column on small screens, adaptive on larger ones
- Added mobile-padding and mobile-margin utilities for consistent spacing

### Component Architecture Improvements
- Built MobileOptimizedCard component with configurable padding and hover effects
- Created MobileResponsiveText component with auto-scaling typography
- Enhanced all major sections with mobile-first responsive classes
- Added comprehensive CSS media queries for mobile and touch devices
- Implemented performance optimizations by hiding decorative elements on mobile

### User Experience Enhancements
- All buttons and interactive elements now meet accessibility standards for touch
- Text automatically scales based on viewport size using responsive font classes
- Grid layouts adapt smoothly from mobile to desktop with proper gap management
- Forms and contact sections optimized for mobile input and interaction