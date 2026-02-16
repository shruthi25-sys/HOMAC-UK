# Admin Modules Quick Reference

## Module Checklist

### For Each New Admin Module

- [ ] Create route: `/app/admin/[module]/page.tsx`
- [ ] Add navigation item to sidebar with icon
- [ ] Create store functions in `lib/admin-stores.ts`
- [ ] Implement role-based permission checks
- [ ] Add audit logging for all actions
- [ ] Build responsive UI (mobile-first)
- [ ] Implement form validation
- [ ] Add error handling
- [ ] Include accessibility features
- [ ] Add loading states
- [ ] Implement pagination if needed
- [ ] Add filtering/search functionality
- [ ] Create unit tests

---

## Code Patterns

### Store Function Pattern

```typescript
export interface YourItem {
  id: string
  // ... properties
  createdAt: string
  updatedAt: string
}

const KEY = "homac_your_items"
const DEFAULT_ITEMS: YourItem[] = [/* demo data */]

export function getItems(): YourItem[] {
  if (typeof window === "undefined") return DEFAULT_ITEMS
  const stored = localStorage.getItem(KEY)
  if (!stored) {
    localStorage.setItem(KEY, JSON.stringify(DEFAULT_ITEMS))
    return DEFAULT_ITEMS
  }
  try {
    return JSON.parse(stored)
  } catch {
    return DEFAULT_ITEMS
  }
}

export function saveItem(item: YourItem): void {
  const items = getItems()
  const index = items.findIndex((i) => i.id === item.id)
  if (index >= 0) {
    items[index] = { ...item, updatedAt: new Date().toISOString() }
  } else {
    items.unshift(item)
  }
  localStorage.setItem(KEY, JSON.stringify(items))
}

export function deleteItem(id: string): void {
  const items = getItems().filter((i) => i.id !== id)
  localStorage.setItem(KEY, JSON.stringify(items))
}
```

### Permission Check Pattern

```typescript
import { useAdminAuth } from "@/components/admin/admin-auth-context"
import { canPerformAction, hasPermission } from "@/lib/admin-auth"

export default function MyModule() {
  const { session } = useAdminAuth()
  const isEditor = session?.user.role === "editor"

  const handleCreate = () => {
    if (!canPerformAction("create_item")) {
      alert("You don't have permission to create items")
      return
    }
    // Proceed with creation
  }

  return (
    <Button onClick={handleCreate} disabled={isEditor}>
      Create Item
    </Button>
  )
}
```

### Audit Logging Pattern

```typescript
import { logAuditEvent } from "@/lib/admin-auth"

const handleSave = () => {
  // ... save logic
  logAuditEvent("item_created", {
    itemId: newItem.id,
    name: newItem.name,
  }, session?.user || null)
}
```

---

## Component Structure

### Typical Module Page Structure

```typescript
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAdminAuth } from "@/components/admin/admin-auth-context"
import { getItems, saveItem, deleteItem, canPerformAction, logAuditEvent } from "@/lib/admin-stores"

export default function ItemsManagement() {
  const { session, isLoading } = useAdminAuth()
  const [items, setItems] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setItems(getItems())
  }, [])

  if (isLoading || !mounted) {
    return <LoadingSpinner />
  }

  const isEditor = session?.user.role === "editor"

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header />

      {/* Form/Modal */}
      {showForm && <FormModal />}

      {/* List */}
      <ItemsList items={items} />

      {/* Editor Warning */}
      {isEditor && <EditorWarning />}
    </div>
  )
}
```

---

## Sidebar Navigation Setup

Add to `components/admin/admin-sidebar.tsx`:

```typescript
interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  adminOnly?: boolean
}

const navItems: NavItem[] = [
  // ... existing items
  { label: "Your Module", href: "/admin/your-module", icon: YourIcon },
]
```

---

## Form Validation Pattern

```typescript
const validateForm = (): boolean => {
  const newErrors: Record<string, string> = {}

  if (!formData.name?.trim()) {
    newErrors.name = "Name is required"
  }

  if (!formData.email?.trim()) {
    newErrors.email = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Invalid email format"
  }

  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

const handleSubmit = () => {
  if (!validateForm()) return
  // Proceed with submission
}
```

---

## Animation Patterns

### List Item Entry Animation

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.05 }}
>
  {/* Item content */}
</motion.div>
```

### Page Header Animation

```typescript
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* Header content */}
</motion.div>
```

---

## Error Handling Pattern

```typescript
const handleOperation = async () => {
  try {
    setLoading(true)
    setError("")

    // Perform operation
    const result = await performAction()

    // Log audit event
    logAuditEvent("action_completed", { result }, session?.user || null)

    // Update state
    setItems(getItems())
  } catch (err) {
    setError(err instanceof Error ? err.message : "An error occurred")
    logAuditEvent("action_failed", { error: err }, session?.user || null)
  } finally {
    setLoading(false)
  }
}
```

---

## Responsive Design Checklist

- [ ] Mobile-first CSS (start with mobile, enhance for larger screens)
- [ ] Use Tailwind responsive prefixes: `sm:`, `md:`, `lg:`
- [ ] Test on mobile (< 600px)
- [ ] Test on tablet (600px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Test with hamburger menu on mobile
- [ ] Ensure touch targets are at least 44x44px
- [ ] Test form inputs on mobile keyboards
- [ ] Verify modals/dialogs work on small screens

---

## Accessibility Checklist

- [ ] All buttons have aria-labels if not descriptive
- [ ] Form inputs have associated labels
- [ ] Color contrast ratio >= 4.5:1
- [ ] Focus states visible on all interactive elements
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Semantic HTML (use `<button>` not `<div>`)
- [ ] Images have alt text
- [ ] Error messages descriptive
- [ ] Loading states announced to screen readers
- [ ] Modal focus trapped

---

## Testing Checklist

### Manual Testing

- [ ] Create new item - verify saved and listed
- [ ] Edit item - verify changes persist
- [ ] Delete item - verify removed with confirmation
- [ ] Test with editor role - verify restrictions
- [ ] Test with admin role - verify full access
- [ ] Test form validation - try invalid inputs
- [ ] Test mobile responsiveness
- [ ] Test browser back button behavior
- [ ] Test session expiration
- [ ] Verify audit logs created

### Edge Cases

- [ ] Empty list state
- [ ] Large numbers of items (100+)
- [ ] Special characters in text fields
- [ ] Very long text (truncation)
- [ ] Rapid clicking on buttons
- [ ] Network errors (if API)
- [ ] Session timeout mid-operation
- [ ] Multiple tabs open

---

## Performance Tips

- Use `useCallback` for event handlers
- Memoize list components with `React.memo`
- Use virtualization for large lists (100+ items)
- Lazy load images in media library
- Debounce search/filter inputs
- Avoid re-rendering entire list on single item change
- Use React Query or SWR for data fetching (future)

---

## Styling Guidelines

### Color Palette

- **Primary**: `from-primary to-primary` (brand color)
- **Accent**: `from-accent to-accent` (secondary brand)
- **Success**: `text-emerald-600`, `bg-emerald-100`
- **Warning**: `text-amber-600`, `bg-amber-100`
- **Error**: `text-red-600`, `bg-red-100`
- **Neutral**: `text-slate-600`, `bg-slate-100`

### Dark Mode

All components support dark mode with `dark:` prefix:

```typescript
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
```

---

## Common Issues & Solutions

### Issue: State not updating after save
**Solution**: Call `setItems(getItems())` after save to refresh from storage

### Issue: Role check not working
**Solution**: Verify `useAdminAuth()` is called, session is not null

### Issue: Form validation not showing
**Solution**: Check errors state is being set correctly, render errors array

### Issue: Images not loading
**Solution**: Ensure image URLs are correct, check CORS if external

### Issue: Mobile layout broken
**Solution**: Use Tailwind responsive prefixes, test with DevTools

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Documentation](https://react.dev)
- [Framer Motion Guide](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)
- [Shadcn UI Components](https://ui.shadcn.com)
