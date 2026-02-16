# Admin Modules - Testing & Access Guide

## Quick Start

### 1. Access Admin Panel
Click the "Admin" button in the top navigation bar of any public page.

### 2. Sign In
Use one of the test credentials:

**Full Admin Access**:
- Email: `admin@homacuk.com`
- Password: `admin123`

**Limited Editor Access**:
- Email: `editor@homacuk.com`
- Password: `editor123`

### 3. Navigate Modules
Once signed in, you'll see the sidebar with all available modules. Click any module to access it.

---

## Module Access URLs

### Direct URLs
After logging in, you can access modules directly:

- **Dashboard**: `/admin` - Overview and quick stats
- **Courses**: `/admin/courses` - Course management
- **Testimonials**: `/admin/testimonials` - Testimonial moderation
- **Media Library**: `/admin/media` - Media asset management
- **Analytics**: `/admin/analytics` - Performance metrics
- **Enquiries**: `/admin/enquiries` - Parent enquiries
- **Franchises**: `/admin/franchises` - Franchise applications

---

## Feature Testing Workflows

### Testing as Admin (Full Access)

#### Courses Module
```
1. Navigate to /admin/courses
2. Click "New Course" button
3. Fill in form:
   - Name: "Test Course"
   - Level: "Intermediate"
   - Age Group: "7-10 years"
   - Duration: "12 months"
   - Price: "55"
   - Description: "A test course description"
4. Add 3 features:
   - Click "Add" after each
   - Features: "Live Classes", "Progress Tracking", "Certificate"
5. Set Status: "Active"
6. Click "Save Course"
7. Verify course appears in list
8. Click Edit pencil icon
9. Change price to "65"
10. Save changes
11. Verify update in list
12. Click delete trash icon
13. Confirm deletion
14. Verify course removed from list
```

#### Testimonials Module
```
1. Navigate to /admin/testimonials
2. Click "New Testimonial"
3. Fill form:
   - Name: "John Smith"
   - Role: "Parent"
   - Content: "Excellent program, highly recommended!"
   - Rating: 5 stars (click stars)
   - Feature: Check checkbox
4. Set Status: "Approved"
5. Save Testimonial
6. Filter to "Approved" tab
7. Verify testimonial appears
8. Click star icon to toggle featured
9. Verify featured indicator appears
10. As admin, test all actions
```

#### Media Library
```
1. Navigate to /admin/media
2. Click upload area or drag file
3. Select an image (JPEG/PNG/GIF/WebP, < 5MB)
4. Verify preview thumbnail appears
5. Hover over image
6. Click copy icon - verify "URL copied" message
7. Click download icon
8. Verify file downloads
9. Click trash icon
10. Confirm deletion
11. Verify image removed from grid
12. Check "Storage Information" card updates
```

#### Analytics Dashboard
```
1. Navigate to /admin/analytics
2. Observe 6 metric cards:
   - Page Views, Enquiries, Courses, Conversion Rate, Franchises, Testimonials
3. Scroll to Recent Activity
4. View activity feed with timestamps
5. Check Performance section
   - API Response bar
   - Page Load Speed bar
   - Database Health bar
6. Review Top Pages section
   - Home, Courses, About, Contact
7. Change date range:
   - Click "Week"
   - Click "Month"
   - Click "All Time"
8. Verify metrics update (values recalculate)
```

---

### Testing as Editor (Limited Access)

#### Courses Module
```
1. Navigate to /admin/courses
2. Notice "New Course" button is DISABLED
3. Try clicking edit pencil - should fail with alert
4. Try clicking delete trash - should fail with alert
5. Scroll down - see "Editor Access" warning card
6. Notice color badge on buttons
```

#### Testimonials Module
```
1. Navigate to /admin/testimonials
2. Click "New Testimonial" - should work (editors can create)
3. Fill form and save
4. View testimonial with "Pending" status
5. Try to click approve icon - should fail (admin only)
6. Try to delete - should fail (admin only)
7. Click edit - should work (editors can edit)
8. Make changes and save
9. Verify changes in list
```

#### Media Library
```
1. Navigate to /admin/media
2. Notice upload area is HIDDEN
3. See "Storage Information" card
4. Hover over images - action buttons hidden
5. See "Editor Access" warning card
```

#### Analytics Dashboard
```
1. Navigate to /admin/analytics
2. All analytics accessible (editors can view)
3. See all metrics and charts
4. Change date range filters
5. Review activity and performance
```

---

## Data Persistence Testing

### Verify Data Saves
```
1. Create a course
2. Refresh page (F5)
3. Navigate to /admin/courses
4. Verify course still appears (saved in localStorage)

1. Create testimonial
2. Close browser tab
3. Reopen tab and navigate to /admin
4. Go to testimonials
5. Verify testimonial persists
```

### Test Form Validation
```
1. Go to /admin/courses
2. Click "New Course"
3. Try to save without name
4. See error: "Course name is required"
5. Enter name but no age group
6. Try to save
7. See error: "Age group is required"
8. Leave price as 0
9. See error: "Valid price is required"
10. Fill all required fields
11. Save - should succeed
```

### Test Permissions
```
1. As Editor, go to /admin/courses
2. Click edit button
3. Try to change and save
4. Success - editors can edit

As Editor:
1. Go to /admin/courses
2. Try to click delete
3. Button is disabled
4. See "Editor Access" warning

As Admin:
1. Go to /admin/courses
2. Delete button works normally
3. No restrictions
```

---

## Browser Storage Inspection

### Using Chrome DevTools
```
1. Open Chrome Developer Tools (F12)
2. Go to Application tab
3. Expand "Local Storage"
4. Select your domain
5. View stored keys:
   - homac_courses
   - homac_testimonials
   - homac_media
   - homac_admin_audit
   - homac_admin_session

6. Click each key to see JSON data
7. Edit values directly (for testing)
8. Changes reflect in app immediately
```

---

## Performance Testing

### Load Time Measurement
```
1. Open Chrome DevTools (F12)
2. Go to Performance tab
3. Click record
4. Navigate to /admin/courses
5. Wait for page to load
6. Stop recording
7. View load metrics:
   - First Contentful Paint (FCP)
   - Largest Contentful Paint (LCP)
   - Cumulative Layout Shift (CLS)
   
Ideal:
- FCP < 1.5s
- LCP < 2.5s
- CLS < 0.1
```

### Network Testing
```
1. Open DevTools Network tab
2. Navigate between modules
3. Check file sizes
4. Verify no 404 errors
5. Test with throttling:
   - Set to "Slow 3G" or "Fast 3G"
   - Navigate modules
   - Should still be usable
```

---

## Responsive Design Testing

### Mobile Testing (< 768px)
```
1. Open DevTools
2. Click device toolbar icon
3. Select "iPhone 12" or similar
4. Navigate to /admin
5. Verify sidebar appears as hamburger menu
6. Click hamburger to open/close
7. Click navigation item to go to module
8. Sidebar closes automatically
9. All forms readable on mobile
10. Buttons/inputs touch-friendly (44x44px minimum)
```

### Tablet Testing (768px - 1024px)
```
1. Set viewport to 768px wide
2. Navigate /admin/courses
3. Verify 2-column layout
4. Forms still accessible
5. Buttons appropriately sized
```

### Desktop Testing (> 1024px)
```
1. Full screen browser
2. Navigate /admin/analytics
3. Verify full 3-column layout
4. Sidebar shows full labels
5. All components visible
6. Sidebar collapse/expand works
```

---

## Accessibility Testing

### Keyboard Navigation
```
1. Open /admin/courses
2. Press Tab repeatedly
3. Verify focus visible on each button
4. Press Enter on buttons to activate
5. Press Escape to close modals
6. Use Tab to navigate form inputs
```

### Screen Reader Testing (Mac)
```
1. Enable VoiceOver: Cmd+F5
2. Navigate /admin
3. Headings read as "Heading Level 2: Courses Management"
4. Buttons read with aria-label
5. Form inputs associated with labels
6. Status badges read color name
```

### Color Contrast
```
1. Open DevTools (F12)
2. Go to Accessibility tab
3. Click "Check accessibility issues"
4. Verify no contrast warnings
5. Or use WebAIM Contrast Checker:
   - Primary text on white: 4.5:1 ✓
   - Badge colors: 4.5:1 ✓
```

---

## Edge Case Testing

### Test Empty States
```
1. Start with fresh browser (clear localStorage)
2. Go to /admin/courses
3. See empty state: "No courses yet..."
4. Same for testimonials, media

Test with data:
1. Create one course
2. Delete all courses
3. Go back to /admin/courses
4. See empty state message
```

### Test Form Errors
```
1. Go to /admin/testimonials
2. Start filling form
3. Enter invalid ratings (0, 6, -1)
4. Try to submit
5. See error validation

Test with long text:
1. Paste very long testimonial (1000+ chars)
2. Save - should work
3. Verify text displays correctly (may wrap/truncate)
```

### Test Multiple Operations
```
1. Open /admin in 2 browser tabs
2. Create course in Tab 1
3. Switch to Tab 2
4. Navigate to courses
5. Verify new course appears (localStorage synced)
6. Edit course in Tab 2
7. Go back to Tab 1
8. Refresh - see changes
```

---

## Audit Logging Test

### Verify Audit Events
```
1. As admin, navigate to /admin/audit
2. Perform action: Create course
3. Refresh audit page
4. See new "course_created" entry
5. Click to view details:
   - courseId
   - name
   - timestamp
   - user (admin name)

Events logged:
- course_created/updated/deleted
- testimonial_created/approved/deleted
- media_uploaded/deleted
- login_success/failed
- logout
```

---

## Common Test Scenarios

### Scenario 1: Complete Content Publishing Workflow
```
1. Admin creates course in draft
2. Publishes course (changes to active)
3. Admin creates testimonial
4. Testimonial starts pending
5. Admin approves testimonial
6. Features testimonial for homepage
7. Analytics shows updates in metrics
8. Course appears in public course list
```

### Scenario 2: Editor Review & Admin Approval
```
1. Editor creates testimonial
2. Testimonial marked pending
3. Admin notified (in audit log)
4. Admin reviews and approves
5. Testimonial appears as published
6. Editor can still edit their testimonials
7. But cannot delete or approve others
```

### Scenario 3: Media Organization
```
1. Admin uploads hero banner image
2. Copies URL to clipboard
3. Uses URL in course hero section
4. Later uploads replacement image
5. Updates URL references manually
6. Deletes old image
7. Verifies updated image displays
```

---

## Troubleshooting

### Data Not Persisting
**Problem**: Created course disappears after refresh
**Solution**: 
- Check localStorage enabled in browser
- View DevTools > Application > Storage > Local Storage
- Verify `homac_courses` key exists with data

### Buttons Disabled as Editor
**Problem**: Can't create items as editor
**Solution**:
- Verify logged in as editor (check role badge)
- Some admin-only actions intentionally disabled
- This is correct behavior

### File Upload Not Working
**Problem**: Can't upload image
**Solution**:
- Check file format (must be JPEG, PNG, GIF, WebP)
- Check file size (must be < 5MB)
- Try different browser
- Check browser storage quota

### Performance Issues
**Problem**: Modules load slowly
**Solution**:
- Clear browser cache and localStorage
- Restart browser
- Try Incognito/Private mode
- Check network speed (throttle settings)

---

## Test Report Template

Use this template to document testing:

```
Date: _________
Tester: _________
Browser: _________
Resolution: _________

Module: ___________
Test Case: ___________
Expected Result: ___________
Actual Result: ___________
Status: [✓ Pass / ✗ Fail]
Notes: ___________

Module: ___________
Test Case: ___________
Expected Result: ___________
Actual Result: ___________
Status: [✓ Pass / ✗ Fail]
Notes: ___________

Overall Status: [✓ All Pass / ⚠ Some Issues / ✗ Major Issues]
Issues Found:
1. ___________
2. ___________

Recommendations:
1. ___________
2. ___________
```

---

## Feedback & Issues

### Report Issues
1. Document the issue with steps to reproduce
2. Include browser and device info
3. Attach screenshots if helpful
4. Contact development team

### Feature Requests
1. Describe desired functionality
2. Explain use case/benefit
3. Provide examples or mockups
4. Submit to product team
