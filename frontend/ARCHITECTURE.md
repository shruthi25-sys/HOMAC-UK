# Architecture Overview

## Application Structure

### Frontend (Public)
- **Pages**: Home, About, Courses, Franchise, Contact
- **Components**: Navbar, Footer, Cards, Forms
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion

### Backend
- **API Routes**: Next.js API routes
- **Validation**: Input validation and sanitization
- **Data**: Mock data (ready for database integration)

## Data Flow

1. **Forms** → Validation → **API Routes** → Storage
2. **User Pages** → Fetch Data → Display

## Component Hierarchy

```
RootLayout
├── Navbar
├── Main Routes
│   ├── Home (Public)
│   ├── About (Public)
│   ├── Courses (Public)
│   ├── Franchise (Public)
│   └── Contact (Public)
└── Footer
```

## State Management

- **Client-side**: React hooks (useState, useEffect)
- **Form State**: Native HTML forms
- **Server State**: API routes

For production, consider:
- Redux or Zustand for complex state
- TanStack Query for server state
- Context API for global state

## Styling System

### Color Tokens (in globals.css)
- Primary: Blue (#6838C5)
- Accent: Teal (#4FBAA8)
- Secondary: Purple (#7C3AED)
- Neutrals: Grayscale

### Typography
- Heading Font: Inter
- Body Font: Poppins
- Mono Font: JetBrains Mono

## Performance Considerations

1. **Code Splitting**: Automatic via Next.js
2. **Image Optimization**: Next.js Image component
3. **Font Optimization**: Google Fonts with `next/font`
4. **CSS**: Tailwind JIT compilation
5. **Caching**: HTTP headers configured

## Security Architecture

1. **Input Validation**: Server-side validation
2. **CORS**: Configured in Next.js
3. **Headers**: Security headers set
4. **HTTPS**: Enforced on production

## Scalability

### Horizontal Scaling
- Stateless API routes
- No session state on server
- Can run on multiple instances

### Database Integration
- Ready for any database
- Mock data placeholder
- Schema design provided
