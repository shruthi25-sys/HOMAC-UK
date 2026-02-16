# Homac UK - Quick Start Guide

## Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## File Structure Overview

```
app/
├── page.tsx              # Home page
├── about/page.tsx        # About page
├── courses/page.tsx      # Courses page
├── franchise/page.tsx    # Franchise page
├── contact/page.tsx      # Contact page
├── admin/
│   ├── login/page.tsx    # Admin login
│   ├── dashboard/page.tsx # Main dashboard
│   ├── courses/page.tsx   # Manage courses
│   ├── students/page.tsx  # Manage students
│   ├── enquiries/page.tsx # View enquiries
│   ├── franchises/page.tsx # Franchise apps
│   ├── testimonials/page.tsx # Manage testimonials
│   └── settings/page.tsx  # Admin settings
├── api/
│   ├── admin/login/route.ts
│   ├── contact/submit/route.ts
│   ├── franchise/submit/route.ts
│   ├── enquiries/route.ts
│   └── health/route.ts
└── globals.css           # Theme & styling

components/
├── ui/                   # Shadcn UI components
├── navigation/navbar.tsx # Top navigation
├── footer/footer.tsx     # Footer
├── admin/sidebar.tsx     # Admin sidebar
└── forms/                # Form components
```

## Key Features

### Public Pages
- **Home**: Hero section, value proposition, testimonials, CTA
- **About**: Company history, mission, vision, values, statistics
- **Courses**: Detailed course information, pricing, outcomes
- **Franchise**: Benefits, requirements, application process
- **Contact**: Contact form, enquiry management, map

### Admin Panel
- **Dashboard**: Statistics, overview, quick stats
- **Courses**: Create, read, update, delete courses
- **Students**: Manage student profiles and progress
- **Enquiries**: Track and manage customer enquiries
- **Franchises**: Review and manage franchise applications
- **Testimonials**: Approve and manage testimonials
- **Settings**: Configure system settings and preferences

## Admin Login

**Default Credentials:**
- Email: `admin@homacuk.com`
- Password: `admin123`

⚠️ Change these credentials in production!

## API Routes

### Authentication
- `POST /api/admin/login` - Admin login

### Forms
- `POST /api/contact/submit` - Contact form
- `POST /api/franchise/submit` - Franchise application

### Data
- `GET /api/enquiries` - Fetch enquiries
- `POST /api/enquiries` - Create enquiry
- `GET /api/health` - Health check

## Customization

### Change Brand Colors
Edit in `app/globals.css`:
```css
--primary: oklch(0.42 0.22 264.5);  /* Change primary color */
--accent: oklch(0.62 0.2 180);      /* Change accent color */
```

### Change Fonts
Edit in `app/layout.tsx`:
```tsx
const inter = Inter({ subsets: ["latin"] })
const poppins = Poppins({ weight: ["400", "500", "600", "700"], ... })
```

### Update Content
Edit individual page files in the `app/` directory.

## Building for Production

```bash
# Build
npm run build

# Test production build
npm run start
```

## Deployment to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

See `DEPLOYMENT.md` for detailed instructions.

## Troubleshooting

### Styles not loading
- Clear `.next` folder: `rm -rf .next`
- Restart dev server: `npm run dev`

### Admin login not working
- Check localStorage is enabled in browser
- Verify credentials in `app/api/admin/login/route.ts`
- Clear browser cache and try again

### Forms not submitting
- Check browser console for errors
- Verify API routes are accessible: `curl http://localhost:3000/api/health`
- Ensure form field names match API expectations

## Support

For issues or questions:
- Check `README.md` for full documentation
- Review `ARCHITECTURE.md` for technical details
- Contact: info@homacuk.com
