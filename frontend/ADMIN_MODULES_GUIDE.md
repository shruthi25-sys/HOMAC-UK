# Admin Management Modules Documentation

## Overview

The Admin Panel includes comprehensive management modules for managing all site content, courses, testimonials, media, and analytics. All modules are built with role-based access control, responsive design, and audit logging.

## Module Structure

### 1. Courses Management (`/admin/courses`)

**Purpose**: Create, edit, publish, and manage course offerings

**Features**:
- Create new courses with title, description, age group, duration, and price
- Edit existing courses with real-time validation
- Publish/unpublish courses (Draft, Active, Archived statuses)
- Add course features with easy UI
- Delete courses (admin only)
- View course statistics (enrollments, status)

**Role Permissions**:
- **Admin**: Full access to all operations
- **Editor**: View only (no create/edit/delete)

**Data Fields**:
- Name (required)
- Level (Beginner, Intermediate, Advanced)
- Age Group (e.g., "4-6 years")
- Duration (e.g., "6 months")
- Price (£)
- Description (required)
- Features (list)
- Status (Draft, Active, Archived)
- Enrollment count
- Timestamps

**Validation**:
- All required fields must be filled
- Price must be a valid positive number
- Form prevents submission if validation fails
- Real-time error feedback

---

### 2. Testimonials Management (`/admin/testimonials`)

**Purpose**: Manage and moderate customer testimonials

**Features**:
- Create new testimonials with moderation status
- Edit existing testimonials
- Approve pending testimonials with one-click button
- Feature testimonials on homepage
- Delete testimonials (admin only)
- Filter by status (All, Pending, Approved, Rejected)
- Star rating system (1-5)

**Role Permissions**:
- **Admin**: Full access including approval and deletion
- **Editor**: Can create and edit testimonials (limited permissions)

**Data Fields**:
- Name (required)
- Role (e.g., "Parent", "Student")
- Testimonial Content (required)
- Rating (1-5 stars, required)
- Image (optional)
- Featured (checkbox for homepage display)
- Status (Pending, Approved, Rejected)
- Timestamps

**Moderation Workflow**:
1. Testimonials submitted as "Pending"
2. Admins review and approve/reject
3. Approved testimonials can be featured
4. Featured testimonials appear on homepage

---

### 3. Media Library (`/admin/media`)

**Purpose**: Centralized media asset management

**Features**:
- Drag-and-drop file upload
- Image preview thumbnails
- Copy asset URL to clipboard
- Download assets
- Delete assets (admin only)
- File size and upload date tracking
- Filter by file type (Images, Videos, Documents)
- Storage statistics

**Role Permissions**:
- **Admin**: Upload, delete, manage all media
- **Editor**: View only (no upload/delete)

**Supported Formats**:
- Images: JPEG, PNG, GIF, WebP
- Max file size: 5MB
- Files stored with metadata

**Asset Metadata**:
- Asset ID
- Filename
- Type (Image, Video, Document)
- URL
- File size
- Upload date
- Uploaded by (user)

**Features**:
- URL copying with visual feedback
- Download option for backup
- Storage usage statistics
- Safe deletion with confirmation

---

### 4. Analytics Dashboard (`/admin/analytics`)

**Purpose**: Monitor site performance and key metrics

**Features**:
- Key metrics overview (page views, enquiries, conversion rate, etc.)
- Recent activity feed with timestamps
- Performance indicators (API response, page load, database health)
- Top pages traffic report
- Enquiry status distribution chart
- Course enrollment level breakdown
- Date range filtering (Week, Month, All Time)

**Metrics Tracked**:
- **Total Page Views**: Overall site traffic
- **Total Enquiries**: All incoming enquiries
- **Active Courses**: Currently offered courses
- **Conversion Rate**: Enquiry to conversion ratio
- **Franchise Applications**: New franchise requests
- **Published Testimonials**: Approved testimonial count

**Activity Types**:
- New enquiries
- Course creation/updates
- Testimonial approvals
- Franchise applications
- Page content updates

**Performance Indicators**:
- API Response Time: Shows % uptime
- Page Load Speed: Average load time
- Database Health: System status

**Data Visualization**:
- Progress bars for metrics
- Animated charts
- Color-coded status indicators
- Real-time updates

---

## Role-Based Access Control

### Admin Role
**Permissions**:
- ✅ Create, edit, delete courses
- ✅ Create, edit, delete testimonials
- ✅ Upload and delete media
- ✅ Approve/reject testimonials
- ✅ Manage all pages
- ✅ View audit logs
- ✅ Access user management
- ✅ Configure settings
- ✅ View full analytics

### Editor Role
**Permissions**:
- ✅ Create and edit courses (no delete)
- ✅ Create and edit testimonials (no delete/approve)
- ✅ View media library (no upload/delete)
- ✅ View and respond to enquiries
- ✅ View analytics
- ❌ Delete content
- ❌ Approve testimonials
- ❌ Upload/delete media
- ❌ View audit logs
- ❌ Access settings/users

**Visual Indicators**:
- Disabled buttons for restricted actions
- Warning cards on restricted pages
- Role badge in sidebar

---

## Data Persistence

All module data is persisted using localStorage (frontend storage):

```javascript
// Key structure
homac_courses        // Courses data
homac_testimonials   // Testimonials data
homac_media          // Media assets
homac_enquiries      // Enquiries
homac_franchises     // Franchise applications
homac_cms_pages      // CMS page content
homac_admin_audit    // Audit logs
```

### Migration to Backend
When ready to migrate to a backend:
1. Set up database tables for each module
2. Create API endpoints for CRUD operations
3. Update store functions to use API calls instead of localStorage
4. Implement server-side authentication and authorization
5. Add real file storage (Vercel Blob, AWS S3, etc.)

---

## Audit Logging

All actions are logged for admin oversight:

**Logged Events**:
- `course_created` - New course creation
- `course_updated` - Course modifications
- `course_deleted` - Course deletion
- `testimonial_created` - New testimonial
- `testimonial_updated` - Testimonial edits
- `testimonial_approved` - Testimonial approval
- `testimonial_deleted` - Testimonial deletion
- `media_uploaded` - File uploads
- `media_deleted` - File deletions
- `login_success` - Successful admin login
- `login_failed` - Failed login attempts
- `logout` - Admin sign out

**Audit Entry Structure**:
```typescript
{
  id: string           // Unique event ID
  timestamp: string    // ISO timestamp
  action: string       // Action type
  details: object      // Event details
  user: AdminUser      // Who performed action
  ip?: string          // Optional IP address
}
```

---

## Responsive Design

All modules are fully responsive:

**Mobile (< 768px)**:
- Sidebar becomes hamburger menu
- Single column layouts
- Touch-friendly buttons and forms
- Optimized file uploads
- Scrollable content areas

**Tablet (768px - 1024px)**:
- 2-column grid layouts
- Compact sidebar
- Flexible form layouts

**Desktop (> 1024px)**:
- Full multi-column layouts
- Collapsible sidebar
- Expanded visualizations
- Side-by-side components

---

## Accessibility Features

- ARIA labels on all interactive elements
- Keyboard navigation support
- Color contrast compliant (WCAG AA)
- Focus indicators on all buttons
- Semantic HTML structure
- Alt text for images
- Form validation messages

---

## Future Extensibility

### Plugin Architecture
New admin modules can be added by:

1. Creating module at `/app/admin/[module]/page.tsx`
2. Adding to sidebar navigation in `components/admin/admin-sidebar.tsx`
3. Creating store functions in `lib/admin-stores.ts`
4. Implementing role-based checks
5. Adding audit logging

### Recommended New Modules
- **Email Campaigns**: Send bulk emails to parents
- **Student Management**: Track individual student progress
- **Billing & Invoicing**: Generate and manage invoices
- **Document Library**: Store and organize resources
- **Event Management**: Create and promote events
- **Feedback & Reviews**: Collect and display feedback
- **Integrations**: Connect external services (Stripe, SendGrid, etc.)

---

## Security Considerations

### Current Implementation
- Session-based authentication with 8-hour expiration
- Role-based access control enforced on frontend
- Audit logging of all admin actions
- Input validation on all forms
- XSS protection via React sanitization

### Production Recommendations
- Implement backend authentication with JWT tokens
- Add rate limiting on API endpoints
- Use HTTPS for all communications
- Implement 2FA for admin accounts
- Regular security audits
- Database encryption for sensitive data
- IP whitelisting for admin access
- Session activity monitoring

---

## Testing

### Admin Credentials
**Administrator Account**:
- Email: `admin@homacuk.com`
- Password: `admin123`
- Full access to all modules

**Editor Account**:
- Email: `editor@homacuk.com`
- Password: `editor123`
- Limited editing permissions

### Test Workflows

**Course Management**:
1. Log in as admin
2. Navigate to Courses
3. Create new course with all fields
4. Edit course details
5. Publish/unpublish course
6. Attempt deletion (confirm)

**Testimonials**:
1. Create testimonial as editor
2. View in pending status
3. Log in as admin
4. Approve testimonial
5. Feature on homepage
6. View in analytics

**Media**:
1. Upload image file
2. Verify preview
3. Copy URL and test
4. Download file
5. Delete (confirm)

**Analytics**:
1. Navigate to Analytics
2. Change date range
3. Verify metrics update
4. Review activity feed
5. Check performance indicators

---

## Performance Optimization

- Lazy loading of module components
- Optimized re-renders with React Context
- Memoized list components
- Image optimization in media library
- Efficient filtering and searching
- Progressive animation loading

---

## Support & Troubleshooting

### Common Issues

**Problem**: Changes not persisting
**Solution**: Check browser localStorage is enabled

**Problem**: Permissions not working
**Solution**: Verify user role in session

**Problem**: File upload fails
**Solution**: Check file size and format (5MB max, JPEG/PNG/GIF/WebP)

**Problem**: Layout issues on mobile
**Solution**: Clear browser cache and refresh

### Contact Support
For additional support or feature requests, contact the development team.
