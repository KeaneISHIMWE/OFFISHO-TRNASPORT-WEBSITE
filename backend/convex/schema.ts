import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    password_hash: v.string(),
    role: v.union(v.literal("user"), v.literal("admin")),
    created_at: v.number(),
    updated_at: v.number(),
  })
    .index("by_email", ["email"]),

  cars: defineTable({
    name: v.string(),
    model: v.string(),
    description: v.union(v.string(), v.null()),
    image_url: v.union(v.string(), v.null()),
    rental_price_per_day: v.number(),
    buy_price: v.union(v.number(), v.null()),
    sell_price: v.union(v.number(), v.null()),
    car_type: v.union(
      v.literal("luxury"),
      v.literal("suv"),
      v.literal("sedan"),
      v.literal("convertible"),
      v.literal("van")
    ),
    event_suitability: v.array(v.string()),
    availability_status: v.union(
      v.literal("available"),
      v.literal("rented"),
      v.literal("sold"),
      v.literal("maintenance")
    ),
    specs: v.any(),
    created_at: v.number(),
    updated_at: v.number(),
  })
    .index("by_type", ["car_type"])
    .index("by_availability", ["availability_status"]),

  requests: defineTable({
    user_id: v.id("users"),
    car_id: v.id("cars"),
    request_type: v.union(v.literal("rent"), v.literal("buy"), v.literal("sell")),
    with_driver: v.boolean(),
    deposit_amount: v.number(),
    total_amount: v.number(),
    event_date: v.union(v.number(), v.null()),
    event_type: v.union(v.string(), v.null()),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    agreement_text: v.union(v.string(), v.null()),
    payment_method: v.union(v.string(), v.null()),
    created_at: v.number(),
    updated_at: v.number(),
  })
    .index("by_user", ["user_id"])
    .index("by_car", ["car_id"])
    .index("by_status", ["status"]),

  payments: defineTable({
    request_id: v.id("requests"),
    amount: v.number(),
    payment_method: v.string(),
    transaction_id: v.union(v.string(), v.null()),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("refunded")
    ),
    created_at: v.number(),
  })
    .index("by_request", ["request_id"]),
});
