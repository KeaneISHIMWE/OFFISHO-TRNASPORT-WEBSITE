# Frontend Integration Quick Reference

## Files to Update

### 1. Update App.tsx
**File**: `frontend/src/App.tsx`

**Change**:
```typescript
// OLD
import { AuthProvider } from './context/AuthContext';

// NEW
import { AuthProvider } from './context/AuthContextConvex';
```

### 2. Update Login Page
**File**: `frontend/src/pages/Login.tsx`

**Replace API calls with Convex**:
```typescript
// The AuthContext is already updated, no changes needed
// Just ensure you're importing from the correct context
```

### 3. Update Cars Page
**File**: `frontend/src/pages/Cars.tsx`

**Replace**:
```typescript
// OLD
import { carsAPI } from '../services/api';
const { cars } = await carsAPI.getCars(params);

// NEW
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const cars = useQuery(api.cars.list, {
  type: selectedType,
  minPrice: priceRange[0],
  maxPrice: priceRange[1],
  search: searchQuery,
  eventType: selectedEvent,
});
```

### 4. Update CarDetails Page
**File**: `frontend/src/pages/CarDetails.tsx`

**Replace**:
```typescript
// OLD
import { carsAPI } from '../services/api';
const { car } = await carsAPI.getCarById(id);

// NEW
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const carData = useQuery(api.cars.getById, { id: id as Id<"cars"> });
const car = carData?.car;
```

### 5. Update Booking Page
**File**: `frontend/src/pages/Booking.tsx`

**Replace**:
```typescript
// OLD
import { requestsAPI } from '../services/api';
await requestsAPI.createRequest(requestData);

// NEW
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

const createRequest = useMutation(api.requests.create);
await createRequest({
  car_id: carId,
  request_type: 'rent',
  with_driver: withDriver,
  event_date: eventDate,
  event_type: eventType,
});
```

### 6. Update AdminDashboard
**File**: `frontend/src/components/AdminDashboard.tsx`

**Replace**:
```typescript
// OLD
import { carsAPI, requestsAPI } from '../services/api';
const { cars } = await carsAPI.getCars();
const { requests } = await requestsAPI.getRequests();

// NEW
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

const carsData = useQuery(api.cars.list, {});
const requestsData = useQuery(api.requests.list, {});
const cars = carsData?.cars || [];
const requests = requestsData?.requests || [];

// For mutations
const updateStatus = useMutation(api.requests.updateStatus);
const createCar = useMutation(api.cars.create);
const updateCar = useMutation(api.cars.update);
const deleteCar = useMutation(api.cars.remove);
```

### 7. Update Contact Page
**File**: `frontend/src/pages/Contact.tsx`

**Replace**:
```typescript
// OLD
import { contactAPI } from '../services/api';
await contactAPI.sendMessage({ name, email, message });

// NEW
import { useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';

const sendContactEmail = useAction(api.actions.sendContactEmail);
await sendContactEmail({ name, email, message });
```

## Convex Hooks Patterns

### Query (Read Data)
```typescript
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

// Simple query
const data = useQuery(api.cars.list, {});

// Query with parameters
const car = useQuery(api.cars.getById, { id: carId });

// Conditional query (skip if no ID)
const car = useQuery(api.cars.getById, carId ? { id: carId } : "skip");

// Loading state
if (data === undefined) return <div>Loading...</div>;
if (data === null) return <div>Not found</div>;
```

### Mutation (Write Data)
```typescript
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

const createCar = useMutation(api.cars.create);

// Call mutation
const handleSubmit = async () => {
  try {
    await createCar({
      name: "Toyota Camry",
      model: "2024",
      car_type: "sedan",
      rental_price_per_day: 50000,
      availability_status: "available",
    });
  } catch (error) {
    console.error("Failed to create car:", error);
  }
};
```

### Action (External API Calls)
```typescript
import { useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';

const sendEmail = useAction(api.actions.sendContactEmail);

// Call action
const handleContact = async () => {
  try {
    await sendEmail({
      name: "John Doe",
      email: "john@example.com",
      message: "Hello!",
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};
```

## Real-time Updates

Convex queries automatically update in real-time!

```typescript
// This will automatically re-render when data changes
const cars = useQuery(api.cars.list, {});

// No need for polling or manual refresh
// Changes from other users appear instantly
```

## Error Handling

```typescript
const createRequest = useMutation(api.requests.create);

try {
  await createRequest(data);
  // Success
} catch (error: any) {
  // Error message from Convex
  console.error(error.message);
  // Show to user
  setError(error.message);
}
```

## Type Safety

Convex generates TypeScript types automatically:

```typescript
import { Id } from "../../convex/_generated/dataModel";

// Type-safe IDs
const carId: Id<"cars"> = "...";

// Type-safe parameters
const car = useQuery(api.cars.getById, { id: carId });
```

## Migration Checklist

- [ ] Update App.tsx to use AuthContextConvex
- [ ] Update Login.tsx (should work with new context)
- [ ] Update Register.tsx (should work with new context)
- [ ] Update Cars.tsx to use useQuery
- [ ] Update CarDetails.tsx to use useQuery
- [ ] Update Booking.tsx to use useMutation
- [ ] Update AdminDashboard.tsx to use useQuery/useMutation
- [ ] Update Contact.tsx to use useAction
- [ ] Delete services/api.ts
- [ ] Remove axios from package.json
- [ ] Test all features
- [ ] Verify real-time updates work

## Testing Commands

```bash
# Start frontend dev server
cd frontend
npm run dev

# In another terminal, keep Convex dev running
npx convex dev

# Test the application
# Open http://localhost:3000
```

## Common Issues & Solutions

### Issue: "Cannot find module '../../convex/_generated/api'"
**Solution**: Make sure `npx convex dev` is running. It generates the types.

### Issue: Query returns undefined
**Solution**: This is normal during loading. Check for `undefined` state.

### Issue: Mutation fails with "Authentication required"
**Solution**: Make sure user is logged in and Convex Auth is configured.

### Issue: Real-time updates not working
**Solution**: Make sure you're using `useQuery`, not `useMutation` for reading data.

---

**Next**: Update the files listed above, then test the application!
