# Homac UK - Complete Setup Instructions

## Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm package manager
- Git (optional, for version control)

## Initial Setup

### 1. Install Dependencies
```bash
npm install
```

All required packages including Framer Motion, Tailwind CSS, Shadcn/UI, and Next.js are already configured.

### 2. Environment Configuration (Optional)
Create a `.env.local` file from the example:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your settings. For development, defaults are fine.

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at:
- **Public Site**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login

## First Time Access

### Public Pages
Navigate to the homepage to see:
- Modern hero section with animations
- Course information
- About section
- Franchise opportunities
- Contact forms

### Admin Panel
1. Go to http://localhost:3000/admin/login
2. Login with demo credentials:
   - **Email**: admin@homacuk.com
   - **Password**: admin123
3. Explore the dashboard with statistics and management pages

## Project Structure Guide

```
homac-uk/
├── app/
│   ├── layout.tsx              # Root layout with fonts & metadata
│   ├── page.tsx                # Home page
│   ├── globals.css             # Theme colors & styles
│   ├── (public pages)
│   │   ├── about/page.tsx
│   │   ├── courses/page.tsx
│   │   ├── franchise/page.tsx
│   │   └── contact/page.tsx
│   ├── admin/                  # Admin panel routes
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── courses/page.tsx
│   │   ├── students/page.tsx
│   │   ├── enquiries/page.tsx
│   │   ├── franchises/page.tsx
│   │   ├── testimonials/page.tsx
│   │   └── settings/page.tsx
│   └── api/                    # API endpoints
│       ├── admin/login/route.ts
│       ├── contact/submit/route.ts
│       ├── franchise/submit/route.ts
│       ├── enquiries/route.ts
│       └── health/route.ts
├── components/
│   ├── ui/                     # Shadcn UI components
│   ├── navigation/navbar.tsx
│   ├── footer/footer.tsx
│   ├── admin/sidebar.tsx
│   └── forms/
│       ├── contact-form.tsx
│       └── franchise-form.tsx
├── lib/
│   ├── utils.ts               # Utility functions
│   └── validation.ts          # Form validation
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── next.config.mjs
└── tailwind.config.js
```

## Key Files to Customize

### Brand & Metadata
**File**: `app/layout.tsx`
- Update `title`, `description`, `keywords`
- Change fonts if desired
- Update Open Graph metadata

### Theme Colors
**File**: `app/globals.css`
- Edit CSS custom properties for primary, accent, secondary colors
- Modify color tokens in `:root` and `.dark` sections

### Content Pages
- `app/page.tsx` - Home page content
- `app/about/page.tsx` - About page content
- `app/courses/page.tsx` - Course information
- `app/franchise/page.tsx` - Franchise details
- `app/contact/page.tsx` - Contact info and forms

### Admin Credentials
**File**: `app/api/admin/login/route.ts`
- Change default admin credentials (line 4-7)
- Update validation logic if needed

## Building for Production

### Build
```bash
npm run build
```

### Test Production Build
```bash
npm run start
```

The app will be available at http://localhost:3000 in production mode.

## Deployment to Vercel

### Option 1: GitHub Integration (Recommended)
1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Select your GitHub repository
5. Vercel auto-detects Next.js configuration
6. Click "Deploy"

### Option 2: Vercel CLI
```bash
npm install -g vercel
vercel
```

## Database Integration (For Production)

The app uses mock data. For production, integrate a database:

### Option A: Supabase (PostgreSQL)
```bash
npm install @supabase/supabase-js
```

Create `lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)
```

### Option B: Firebase
```bash
npm install firebase
```

### Option C: MongoDB Atlas
```bash
npm install mongodb
```

## Email Service Integration (For Production)

Set up email notifications for form submissions:

### SendGrid
```bash
npm install @sendgrid/mail
```

### Mailgun
```bash
npm install mailgun.js
```

### Resend
```bash
npm install resend
```

## Forms Configuration

### Contact Form
**File**: `components/forms/contact-form.tsx`
- Endpoint: `/api/contact/submit`
- Fields: firstName, lastName, email, phone, enquiryType, message

### Franchise Form
**File**: `components/forms/franchise-form.tsx`
- Endpoint: `/api/franchise/submit`
- Fields: firstName, lastName, email, phone, location, background

## Troubleshooting

### Issue: Styles not loading
**Solution**:
```bash
rm -rf .next
npm run dev
```

### Issue: Admin login fails
**Solution**: 
- Check browser localStorage is enabled
- Verify credentials in `app/api/admin/login/route.ts`
- Clear browser cache
- Try incognito window

### Issue: Forms not submitting
**Solution**:
- Check browser console for errors
- Verify API endpoint: `curl http://localhost:3000/api/health`
- Check form field names match validation schema

### Issue: Images not displaying
**Solution**:
- Ensure images are in `/public` folder
- Use correct relative paths
- Clear browser cache

## Development Tips

### Hot Reload
Changes to files automatically reload in the browser (Next.js Fast Refresh)

### Type Safety
All code is TypeScript. Use `npm run build` to check for type errors

### CSS in JS
Use Tailwind CSS classes. No need for separate CSS files

### Component Structure
Components are in `/components`. Import with `@/components/...`

## Performance Optimization

The app comes pre-optimized:
- ✅ Image optimization via Next.js Image
- ✅ Font optimization via `next/font`
- ✅ CSS minification via Tailwind
- ✅ Code splitting via Next.js
- ✅ Automatic compression

### Further Optimization
- Use `next/Image` for images
- Lazy load components with `dynamic()`
- Use `next/script` for third-party scripts

## Security Best Practices

Before production deployment:
- [ ] Change admin credentials
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS
- [ ] Set up CORS properly
- [ ] Implement rate limiting on APIs
- [ ] Add CSRF protection
- [ ] Sanitize all user inputs
- [ ] Use parameterized queries for DB
- [ ] Enable security headers

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion
- **Shadcn/UI**: https://ui.shadcn.com
- **TypeScript**: https://www.typescriptlang.org/docs

## Next Steps

1. Customize content for your business
2. Update branding and colors
3. Set up database for production
4. Configure email service
5. Add analytics (Google Analytics, Vercel Analytics)
6. Test all forms thoroughly
7. Deploy to Vercel
8. Monitor performance

## Support Contact

For questions or issues:
- Email: info@homacuk.com
- Docs: See README.md, ARCHITECTURE.md, DEPLOYMENT.md
