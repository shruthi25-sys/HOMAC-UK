# Homac UK - EdTech Platform

A premium, production-ready web application for Homac UK's Abacus & Mental Arithmetic education platform.

## Overview

Homac UK is a modern EdTech platform built with Next.js 14, featuring:

- **Public Pages**: Home, About, Courses, Franchise, Contact
- **Admin Dashboard**: Complete management system with authentication
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Glassmorphism effects, smooth animations with Framer Motion
- **API Routes**: Form validation, enquiry management, authentication
- **SEO Optimized**: Meta tags, Open Graph, structured data

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn/UI
- **Animations**: Framer Motion
- **Forms**: Native HTML with validation
- **Deployment**: Vercel-ready

## Project Structure

```
homac-uk/
├── app/
│   ├── api/                 # API routes
│   ├── admin/               # Admin panel
│   │   ├── dashboard/
│   │   ├── courses/
│   │   ├── students/
│   │   ├── enquiries/
│   │   ├── franchises/
│   │   ├── testimonials/
│   │   ├── settings/
│   │   └── login/
│   ├── about/               # Public pages
│   ├── courses/
│   ├── franchise/
│   ├── contact/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/                  # Shadcn UI components
│   ├── navigation/
│   ├── footer/
│   ├── admin/
│   └── forms/
├── lib/
│   └── validation.ts        # Validation utilities
└── public/                  # Static assets
```

## Features

### Public Features
- ✅ Responsive homepage with hero section
- ✅ Course details and pricing
- ✅ Franchise opportunities
- ✅ Contact and enquiry forms
- ✅ Testimonials carousel
- ✅ Dark/Light mode support
- ✅ SEO optimization
- ✅ Mobile-friendly navigation

### Admin Features
- ✅ Secure login authentication
- ✅ Dashboard with statistics
- ✅ Course management (CRUD)
- ✅ Student management
- ✅ Enquiry tracking
- ✅ Franchise application management
- ✅ Testimonials moderation
- ✅ Settings management
- ✅ Email notification preferences

### Form Validation
- ✅ Contact form with validation
- ✅ Franchise application form
- ✅ Admin login form
- ✅ Error handling and display

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd homac-uk

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Admin Access

**Demo Credentials:**
- Email: `admin@homacuk.com`
- Password: `admin123`

Navigate to `/admin/login` to access the admin panel.

## API Routes

### Authentication
- `POST /api/admin/login` - Admin login

### Forms
- `POST /api/contact/submit` - Contact form submission
- `POST /api/franchise/submit` - Franchise application

### Data
- `GET /api/enquiries` - Fetch all enquiries (authenticated)
- `POST /api/enquiries` - Create enquiry (authenticated)
- `GET /api/health` - Health check

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables (if needed)
4. Deploy

```bash
npm run build
npm run start
```

## Customization

### Theme Colors
Edit color tokens in `app/globals.css`:
```css
--primary: oklch(0.42 0.22 264.5);
--accent: oklch(0.62 0.2 180);
```

### Typography
Fonts are configured in `app/layout.tsx`:
```tsx
const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({ ... })
```

### Content
Update content directly in page files under `app/` directory.

## Security Considerations

- ✅ Input validation on all forms
- ✅ Admin authentication check
- ✅ Secure headers configured
- ✅ CSRF protection ready
- ✅ Environment variables for sensitive data

**For Production:**
- Implement proper JWT with expiration
- Use database for admin credentials
- Enable HTTPS only
- Add rate limiting
- Implement proper email sending
- Add database persistence

## Performance

- ✅ Image optimization
- ✅ Code splitting
- ✅ CSS minification
- ✅ Font optimization
- ✅ Zero JavaScript animations (CSS)
- ✅ Responsive images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

All rights reserved © 2026 Homac UK

## Support

For support or questions, contact: info@homacuk.com
