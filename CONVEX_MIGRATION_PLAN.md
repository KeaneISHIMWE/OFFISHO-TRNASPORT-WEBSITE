# Convex Migration Plan - Offisho Transport

## Phase 1: Project Understanding ✅

### Database Schema (MySQL → Convex)
**Current MySQL Tables:**
1. **users** - Authentication and user management
   - Fields: id (UUID), name, email, phone_number, password_hash, role (user/admin), timestamps
   
2. **cars** - Vehicle inventory
   - Fields: id (UUID), name, model, description, image_url, rental_price_per_day, buy_price, sell_price, car_type (enum), event_suitability (JSON), availability_status (enum), specs (JSON), timestamps
   
3. **requests** - Rental/purchase requests
   - Fields: id (UUID), user_id (FK), car_id (FK), request_type (rent/buy/sell), with_driver (boolean), deposit_amount, total_amount, event_date, event_type, status (enum), agreement_text, payment_method, timestamps
   
4. **payments** - Payment tracking
   - Fields: id (UUID), request_id (FK), amount, payment_method, transaction_id, status (enum), timestamps

### Express Routes → Convex Functions Mapping

#### Auth Routes (`/api/auth`)
- `POST /auth/register` → **Mutation**: `auth:register`
- `POST /auth/login` → **Mutation**: `auth:login` (returns session token)
- `GET /auth/me` → **Query**: `auth:getMe`

#### Cars Routes (`/api/cars`)
- `GET /cars` → **Query**: `cars:list` (with filters)
- `GET /cars/:id` → **Query**: `cars:getById`
- `POST /cars` (admin) → **Mutation**: `cars:create`
- `PUT /cars/:id` (admin) → **Mutation**: `cars:update`
- `DELETE /cars/:id` (admin) → **Mutation**: `cars:delete`

#### Requests Routes (`/api/requests`)
- `GET /requests` → **Query**: `requests:list` (filtered by user/admin)
- `GET /requests/:id` → **Query**: `requests:getById`
- `POST /requests` → **Mutation**: `requests:create`
- `PUT /requests/:id/status` (admin) → **Mutation**: `requests:updateStatus`
- `DELETE /requests/:id` → **Mutation**: `requests:delete`

#### Contact Route (`/api/contact`)
- `POST /contact` → **Action**: `contact:sendMessage` (sends email)

### Business Logic Components

**Controllers:**
- `authController.ts` - JWT-based auth with bcrypt password hashing
- `carController.ts` - CRUD operations, Cloudinary image uploads
- `requestController.ts` - Request management, email notifications
- `contactController.ts` - Contact form email sending

**Middleware:**
- `auth.ts` - JWT token verification, admin role checking
- `upload.ts` - Multer + Cloudinary file upload

**Utils:**
- `email.ts` - Nodemailer SMTP email sending (4 email types)
- `validation.ts` - Joi schema validation

**External Services:**
- Cloudinary (image storage)
- SMTP/Gmail (email notifications)
- MySQL/Railway (database)

### Environment Variables
```
# Current (Express + MySQL)
DATABASE_URL, DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASSWORD
JWT_SECRET, JWT_EXPIRES_IN
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
FRONTEND_URL
ADMIN_EMAIL_SECONDARY

# After Migration (Convex only)
CONVEX_DEPLOYMENT (auto-managed)
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (for actions)
CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET (for actions)
ADMIN_EMAIL_SECONDARY
```

---

## Phase 2: Migration Design

### Convex Schema Design

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    phone_number: v.optional(v.string()),
    password_hash: v.string(),
    role: v.union(v.literal("user"), v.literal("admin")),
    // Convex auto-manages _creationTime
  })
    .index("by_email", ["email"])
    .index("by_phone", ["phone_number"]),

  cars: defineTable({
    name: v.string(),
    model: v.string(),
    description: v.optional(v.string()),
    image_url: v.optional(v.string()),
    rental_price_per_day: v.number(),
    buy_price: v.optional(v.number()),
    sell_price: v.optional(v.number()),
    car_type: v.union(
      v.literal("luxury"),
      v.literal("suv"),
      v.literal("sedan"),
      v.literal("convertible"),
      v.literal("van")
    ),
    event_suitability: v.optional(v.array(v.string())),
    availability_status: v.union(
      v.literal("available"),
      v.literal("rented"),
      v.literal("sold"),
      v.literal("maintenance")
    ),
    specs: v.optional(v.object({
      // Define specific spec fields as needed
    })),
  })
    .index("by_car_type", ["car_type"])
    .index("by_availability", ["availability_status"]),

  requests: defineTable({
    user_id: v.id("users"),
    car_id: v.id("cars"),
    request_type: v.union(v.literal("rent"), v.literal("buy"), v.literal("sell")),
    with_driver: v.optional(v.boolean()),
    deposit_amount: v.optional(v.number()),
    total_amount: v.number(),
    event_date: v.optional(v.string()), // ISO date string
    event_type: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    agreement_text: v.optional(v.string()),
    payment_method: v.optional(v.string()),
  })
    .index("by_user", ["user_id"])
    .index("by_car", ["car_id"])
    .index("by_status", ["status"]),

  payments: defineTable({
    request_id: v.id("requests"),
    amount: v.number(),
    payment_method: v.string(),
    transaction_id: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("refunded")
    ),
  })
    .index("by_request", ["request_id"]),
});
```

### Authentication Strategy

**Convex Auth with @convex-dev/auth:**
- Replace JWT with Convex Auth sessions
- Use bcrypt for password hashing (same as current)
- Implement custom password provider
- Session tokens managed by Convex Auth
- Role-based access control via helper functions

### File Upload Strategy

**Cloudinary via Convex Actions:**
- Keep Cloudinary for image storage (production-ready)
- File uploads handled client-side → Cloudinary
- Return URL stored in Convex database
- Alternative: Convex file storage (simpler but newer)

### Email Strategy

**Nodemailer via Convex Actions:**
- Email sending must use Actions (external API calls)
- Keep existing email templates
- SMTP credentials in Convex environment variables
- 4 email types: request confirmation, admin notification, status update, contact form

### Migration Safety Strategy

**Zero-Downtime Migration:**
1. Build complete Convex backend in parallel
2. Test thoroughly in development
3. Migrate production data to Convex
4. Deploy frontend with Convex integration
5. Monitor for 24-48 hours
6. Remove legacy backend after validation

---

## Phase 3: Convex Implementation Plan

### Step 1: Initialize Convex
```bash
npm install convex @convex-dev/auth
npx convex dev
```

### Step 2: Create Schema
- `convex/schema.ts` - Define all tables with proper indexes

### Step 3: Implement Auth
- `convex/auth.config.ts` - Configure Convex Auth
- `convex/auth.ts` - Auth queries/mutations (register, login, getMe)
- `convex/lib/auth.ts` - Helper functions (getCurrentUser, requireAuth, requireAdmin)

### Step 4: Implement Cars
- `convex/cars.ts` - Queries (list, getById) and Mutations (create, update, delete)
- `convex/actions/uploadImage.ts` - Action for Cloudinary uploads

### Step 5: Implement Requests
- `convex/requests.ts` - Queries and Mutations
- `convex/actions/sendEmail.ts` - Action for email notifications
- Integrate email sending into request creation/updates

### Step 6: Implement Contact
- `convex/contact.ts` - Action for contact form email

### Step 7: Implement Payments
- `convex/payments.ts` - Queries and Mutations (if needed)

---

## Phase 4: Frontend Integration

### Step 1: Install Convex Client
```bash
cd frontend
npm install convex @convex-dev/auth
```

### Step 2: Configure Convex Provider
- Update `frontend/src/main.tsx` with ConvexProvider
- Configure Convex Auth provider

### Step 3: Replace API Calls
- Remove `services/api.ts` (REST API client)
- Create `hooks/useConvex.ts` - Custom hooks for Convex
- Update all components to use `useQuery`, `useMutation`, `useAction`

### Step 4: Update Auth Context
- Replace JWT localStorage with Convex Auth
- Update `context/AuthContext.tsx`

### Step 5: Update Components
- `components/AdminDashboard.tsx` - Use Convex queries/mutations
- `components/BookingForm.tsx` - Use Convex mutations
- `pages/Cars.tsx`, `pages/CarDetails.tsx` - Use Convex queries
- All other pages - Replace REST calls with Convex

### Step 6: Real-time Updates
- Leverage Convex's real-time subscriptions
- Auto-refresh car availability
- Live request status updates for admin

---

## Phase 5: Data Migration

### Migration Script Strategy
```typescript
// scripts/migrateToConvex.ts
// 1. Connect to MySQL
// 2. Connect to Convex
// 3. Migrate users (preserve password hashes)
// 4. Migrate cars
// 5. Migrate requests
// 6. Migrate payments
// 7. Validate data integrity
```

### Data Preservation Checklist
- ✅ User passwords (bcrypt hashes)
- ✅ User roles (admin/user)
- ✅ Car images (Cloudinary URLs)
- ✅ Request relationships (user_id, car_id)
- ✅ Timestamps (map MySQL timestamps to Convex _creationTime)
- ✅ Payment records

### Idempotency
- Check if record exists before inserting
- Use email as unique identifier for users
- Use original MySQL IDs to track migration status

---

## Phase 6: Cleanup & Hardening

### Remove Legacy Backend
1. Delete `backend/` directory
2. Remove MySQL dependencies from `package.json`
3. Remove Express, mysql2, jsonwebtoken, etc.
4. Update root `package.json` scripts
5. Remove Railway/Vercel backend configs

### Remove Unused Frontend Code
1. Delete `frontend/src/services/api.ts`
2. Remove axios dependency
3. Clean up unused imports

### Update Documentation
1. Update README.md
2. Remove MySQL setup guides
3. Add Convex setup instructions
4. Update deployment guides

### Environment Variables Cleanup
1. Remove all MySQL variables
2. Remove JWT_SECRET
3. Keep only Convex and external service vars

### Final Validation
- ✅ All features working
- ✅ Authentication functional
- ✅ File uploads working
- ✅ Emails sending
- ✅ Real-time updates active
- ✅ Admin portal functional
- ✅ No console errors
- ✅ Production deployment successful

---

## Risk Mitigation

### Potential Issues
1. **Password migration** - Bcrypt hashes must transfer correctly
2. **Image URLs** - Cloudinary URLs must remain valid
3. **Email delivery** - SMTP from Convex actions must work
4. **Session management** - Convex Auth sessions vs JWT
5. **File uploads** - Client-side Cloudinary upload flow

### Rollback Plan
1. Keep MySQL database running during migration
2. Keep legacy backend code in git history
3. Test migration on staging environment first
4. Have database backup before migration
5. Monitor error rates post-deployment

---

## Timeline Estimate

- **Phase 1**: ✅ Complete (Project Understanding)
- **Phase 2**: ✅ Complete (Migration Design)
- **Phase 3**: 4-6 hours (Convex Implementation)
- **Phase 4**: 3-4 hours (Frontend Integration)
- **Phase 5**: 2-3 hours (Data Migration)
- **Phase 6**: 1-2 hours (Cleanup)

**Total**: 10-15 hours of development time

---

## Success Criteria

✅ Zero data loss during migration
✅ All features working identically
✅ No legacy backend code remains
✅ No hybrid backend logic
✅ Real-time updates functional
✅ Production deployment successful
✅ Email notifications working
✅ File uploads working
✅ Authentication secure and functional
✅ Admin portal fully operational

---

**Status**: Ready to proceed with Phase 3 - Convex Implementation
