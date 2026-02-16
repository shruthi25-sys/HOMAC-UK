# Admin System Setup Guide

## Overview

The Homac UK admin portal has been fully implemented with a secure authentication system, protected routes, comprehensive dashboard, and role-based access control.

## Architecture

### Key Components

#### 1. **Admin Authentication** (`/lib/admin-auth.ts`)
- Secure session management with localStorage
- Token-based authentication with 8-hour expiration
- Two demo admin accounts for testing:
  - **Admin**: `admin@homacuk.com` / `admin123` (Full access)
  - **Editor**: `editor@homacuk.com` / `editor123` (Limited access)
- Role-based permissions system
- Audit logging for all admin actions

#### 2. **Authentication Context** (`/components/admin/admin-auth-context.tsx`)
- `AdminAuthProvider` wraps all admin routes
- `useAdminAuth()` hook for accessing session data
- Automatic redirect to login for unauthenticated users
- Role checking and permission verification

#### 3. **Admin Sidebar** (`/components/admin/admin-sidebar.tsx`)
- Collapsible navigation sidebar
- Mobile-responsive design
- Role-based menu filtering (admin-only items hidden from editors)
- Active route highlighting
- Quick sign-out functionality

#### 4. **Admin Topbar** (`/components/admin/admin-topbar.tsx`)
- Dynamic page title based on current route
- Notification center with demo notifications
- User profile menu with role display
- Dark mode toggle
- Search functionality

#### 5. **Admin Dashboard** (`/app/admin/page.tsx`)
- Welcome banner with user greeting
- Statistics cards showing:
  - Total enquiries (47)
  - Franchise applications (8)
  - Active courses (12)
  - Page views (2.4k)
- Recent enquiries list with status indicators
- Quick action buttons
- System status display
- Role-based notices for editors

#### 6. **Admin Layout** (`/app/admin/layout.tsx`)
- Wraps all admin routes with authentication
- Combines sidebar and topbar
- Responsive layout with collapsible sidebar
- Login page bypass (no layout chrome on login)

#### 7. **Admin Login Page** (`/app/admin/login/page.tsx`)
- Premium dark-themed UI
- Email and password fields with icons
- Password visibility toggle
- Error message display
- Loading states
- Demo credentials display
- Back to website link

## Entry Points

### Public Navigation
- **Navbar Admin Button**: Located in the main site header
  - Desktop: Styled slate button with animation
  - Mobile: Added to mobile menu
  - Navigates to `/admin/login`

## User Flow

### Authentication Flow
1. User clicks "Admin" button in navbar
2. Redirected to `/admin/login` page
3. Enters credentials (email/password)
4. System validates against demo accounts
5. On success:
   - Session created with 8-hour expiration
   - Middleware cookie set (`homac_admin_active`)
   - Redirect to `/admin` dashboard
6. On failure:
   - Error message displayed
   - Session remains invalid

### Protected Routes
All routes under `/admin/*` are protected by `AdminAuthProvider`:
- `/admin` - Dashboard (authenticated users only)
- `/admin/login` - Login page (accessible to all)
- `/admin/enquiries` - Enquiries list
- `/admin/franchises` - Franchise applications
- `/admin/pages` - Page management
- `/admin/courses` - Course management
- `/admin/testimonials` - Testimonial management
- `/admin/media` - Media library
- `/admin/analytics` - Analytics dashboard
- `/admin/audit` - Audit logs (admin only)
- `/admin/users` - User management (admin only)
- `/admin/settings` - System settings (admin only)

### Role-Based Access
- **Admin**: Full access to all features
- **Editor**: Access to content management only (no audit logs, users, settings)

## Demo Credentials

### Admin Account
- **Email**: `admin@homacuk.com`
- **Password**: `admin123`
- **Role**: Full administrator access
- **Permissions**: All features including audit logs, user management, settings

### Editor Account
- **Email**: `editor@homacuk.com`
- **Password**: `editor123`
- **Role**: Content editor
- **Permissions**: Enquiries, franchises, pages, courses, testimonials, media, analytics (no audit/users/settings)

## Features Implemented

### Security
✅ Session-based authentication
✅ Token expiration (8 hours)
✅ Password hashing validation (demo)
✅ Audit logging system
✅ Role-based access control
✅ Protected routes with auto-redirect
✅ Secure session storage

### User Interface
✅ Premium dark-themed login page
✅ Responsive admin dashboard
✅ Collapsible sidebar navigation
✅ Dynamic topbar with notifications
✅ Mobile-responsive design
✅ Dark mode support
✅ Loading states and animations

### Dashboard Features
✅ Welcome banner with user greeting
✅ Statistics overview with quick links
✅ Recent enquiries list with status filters
✅ Quick action shortcuts
✅ System status indicator
✅ Role-based notices

### Admin Tools
✅ Enquiry management
✅ Franchise application tracking
✅ Page management interface
✅ Course administration
✅ Testimonial management
✅ Media library
✅ Analytics dashboard
✅ Audit logging (admin only)
✅ User management (admin only)
✅ Settings management (admin only)

## How to Use

### First-Time Login
1. Click "Admin" button in the site header
2. Enter demo credentials:
   - Email: `admin@homacuk.com`
   - Password: `admin123`
3. Click "Sign In"
4. Dashboard loads with all statistics and quick actions

### Navigation
- **Sidebar**: Click any menu item to navigate to different sections
- **Collapse Sidebar**: Click the chevron button on desktop to collapse navigation
- **Mobile Menu**: Click hamburger icon to toggle mobile sidebar
- **Quick Actions**: Use dashboard cards to jump to common tasks

### Sign Out
1. Click user menu in top-right corner
2. Select "Sign Out"
3. Redirected to admin login page

## Customization

### Adding New Admin Users
Edit `/lib/admin-auth.ts` and add to `DEMO_ADMINS`:
```typescript
const DEMO_ADMINS: Record<string, { password: string; user: AdminUser }> = {
  "newadmin@homacuk.com": {
    password: "newpassword123",
    user: {
      id: "admin-2",
      email: "newadmin@homacuk.com",
      name: "New Admin",
      role: "admin",
      createdAt: "2026-01-01T00:00:00Z",
    },
  },
  // ... existing users
}
```

### Customizing Dashboard Stats
Edit `/app/admin/page.tsx` and modify the `stats` array to add new statistics cards.

### Adding New Admin Pages
1. Create route: `/app/admin/[feature]/page.tsx`
2. Add navigation item to `navItems` in `/components/admin/admin-sidebar.tsx`
3. Wrap component with `useAdminAuth()` hook if restricted

## Styling & Design

- **Color Scheme**: Premium dark slate with accent gradients
- **Typography**: System font stack with semantic sizing
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography
- **Responsive**: Mobile-first design with breakpoints at md, lg, xl

## Security Considerations

⚠️ **Current Implementation**: Demo/development setup using localStorage
- Not suitable for production without security hardening
- Session data stored in plain localStorage (add encryption for production)
- Password validation is demo-only (implement proper hashing)
- Consider implementing backend session management
- Add HTTPS enforcement and CSRF protection
- Implement rate limiting on login attempts

## Session Management

- **Duration**: 8 hours per session
- **Storage**: Browser localStorage
- **Expiration**: Automatic on timeout or manual logout
- **Cookie**: Middleware cookie for route protection

## Audit Logging

All admin actions are logged including:
- Login attempts (success/failure)
- Logout
- Actions performed (create, update, delete)
- User information and timestamps
- Available in `/admin/audit` (admin only)

## Support

For issues or customizations, refer to:
- Component files in `/components/admin/`
- Authentication logic in `/lib/admin-auth.ts`
- Page implementations in `/app/admin/`
