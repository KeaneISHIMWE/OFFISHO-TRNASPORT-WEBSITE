# Design Guidelines - Tailwind CSS Implementation

## Color Palette (Tailwind Config)
- `navy-blue`: #001F3F
- `sky-blue`: #87CEEB
- `sky-light`: #B0E0E6
- `navy-light`: #003366

## Responsive Breakpoints
- `sm`: 640px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)
- `2xl`: 1536px (extra large)

## Best Practices

### 1. Use Tailwind Classes Instead of Inline Styles
❌ Bad:
```tsx
<div style={{ backgroundColor: '#001F3F', color: '#FFFFFF' }}>
```

✅ Good:
```tsx
<div className="bg-navy-blue text-white">
```

### 2. Responsive Design
Always use responsive prefixes:
```tsx
className="text-sm sm:text-base md:text-lg lg:text-xl"
className="px-4 sm:px-6 md:px-8 lg:px-12"
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
```

### 3. Spacing
Use consistent spacing scale:
- `gap-2` (0.5rem) - tight spacing
- `gap-4` (1rem) - normal spacing
- `gap-6` (1.5rem) - comfortable spacing
- `gap-8` (2rem) - large spacing

### 4. Typography
- Headings: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl`
- Body: `text-sm sm:text-base md:text-lg`
- Small text: `text-xs sm:text-sm`

### 5. Buttons
```tsx
// Primary Button
className="px-6 py-3 bg-sky-blue text-white rounded-lg font-semibold hover:bg-sky-blue/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"

// Secondary Button
className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-navy-blue transition-all duration-300"
```

### 6. Cards
```tsx
className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-4 sm:p-6"
```

### 7. Hover States
Always include smooth transitions:
```tsx
className="transition-all duration-300 hover:scale-105 hover:shadow-xl"
```

## Component Updates Needed

1. **Home.tsx** - Replace inline styles with Tailwind classes
2. **Footer.tsx** - Replace inline styles with Tailwind classes  
3. **Booking.tsx** - Ensure responsive design
4. **AboutUs.tsx** - Update to use Tailwind
5. **Contact.tsx** - Update to use Tailwind

## Status
✅ Navbar - Updated
✅ CarCard - Updated
✅ Cars page - Updated
⏳ Home page - In progress
⏳ Footer - In progress
⏳ Other pages - Pending
