# Admin Portal Button Implementation

## Location

The "Admin" button has been added to the main site navigation in two places:

### Desktop Header
- **Position**: Right side of navbar, before user account buttons
- **Styling**: Dark slate button (`bg-slate-700 hover:bg-slate-800`)
- **Size**: Small (`text-sm px-5`)
- **Animation**: Scale transform on hover/tap
- **Navigation**: Links to `/admin/login`

### Mobile Menu
- **Position**: Top of mobile menu dropdown
- **Title**: "Admin Portal"
- **Styling**: Dark slate button with full width
- **Navigation**: Links to `/admin/login`

## Button Styling

```typescript
// Desktop Button
<Button className="text-sm px-5 bg-slate-700 hover:bg-slate-800 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all">
  Admin
</Button>

// Mobile Button
<Button className="w-full bg-slate-700 hover:bg-slate-800 text-white rounded-xl font-medium shadow-md">
  Admin Portal
</Button>
```

## User Journey

1. **Visitor lands on Homac UK homepage**
2. **Sees "Admin" button in header** (desktop) or mobile menu
3. **Clicks "Admin" button**
4. **Redirected to `/admin/login`** with premium dark-themed login form
5. **Enters admin credentials**:
   - Admin Account: `admin@homacuk.com` / `admin123`
   - Editor Account: `editor@homacuk.com` / `editor123`
6. **On success**: Redirected to `/admin` dashboard
7. **On failure**: Error message displayed, can retry

## Admin Dashboard Features

### Welcome Banner
Displays personalized greeting with user's first name and role

### Statistics Cards (Clickable)
- **Total Enquiries**: 47 (Links to `/admin/enquiries`)
- **Franchise Applications**: 8 (Links to `/admin/franchises`)
- **Active Courses**: 12 (Links to `/admin/courses`)
- **Page Views**: 2.4k (Links to `/admin/analytics`)

Each card shows:
- Icon with gradient background
- Current value
- Change indicator
- Hover effect with arrow icon

### Recent Enquiries Section
Shows 5 most recent enquiries with:
- Customer name
- Enquiry type
- Status badge (New, Contacted, Converted)
- Time received
- Link to full enquiries list

### Quick Actions
Fast access to:
- View Enquiries
- Manage Pages
- Edit Courses
- Testimonials Management

### System Status
Real-time indicators for:
- API Status (Operational)
- Database Connection (Connected)
- Last Backup Time

## Admin Navigation Menu

The sidebar includes the following sections (with role-based filtering):

### Content Management
- Dashboard
- Enquiries
- Franchises
- Pages
- Courses
- Testimonials
- Media

### Analytics & Insights
- Analytics Dashboard

### Admin Only
- Users Management
- Audit Logs
- Settings

### User Section
- Profile info with avatar
- Role display
- Sign Out button

## Mobile Responsive Design

- **Hamburger Menu**: Mobile toggle for sidebar
- **Sidebar**: Full-screen overlay on mobile
- **Topbar**: Fixed position with page title
- **Content**: Padded area with responsive grid

## Color Scheme

### Admin Portal
- **Background**: Dark slate (`bg-slate-800`)
- **Text**: White text on dark background
- **Accent**: Primary color gradients
- **Hover**: Lighter slate shades

### Buttons
- **Admin Button**: Dark slate
- **Primary Actions**: Gradient (amber to orange)
- **Destructive**: Red tones

## Accessibility Features

✅ Semantic HTML structure
✅ ARIA labels on buttons
✅ Keyboard navigation support
✅ High contrast dark theme
✅ Focus indicators on interactive elements
✅ Screen reader friendly navigation

## Performance

- Lazy loading of admin sections
- Optimized animations with Framer Motion
- Efficient session checking
- Minimal re-renders with React hooks

## Security Notes

### Current Implementation
- Session stored in localStorage (8-hour expiration)
- Demo credentials for development/testing
- Audit logging enabled
- Role-based access control implemented

### For Production Deployment
1. Migrate to server-side session management
2. Implement proper password hashing (bcrypt)
3. Add rate limiting on login
4. Enable HTTPS enforcement
5. Add CSRF protection
6. Implement API key rotation
7. Set up IP whitelisting for admin access
8. Enable 2FA for admin accounts
