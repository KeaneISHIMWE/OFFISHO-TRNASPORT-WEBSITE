import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getRequests = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    let requests = await ctx.db.query("requests").collect();

    // If userId provided, filter by user (for non-admin users)
    if (args.userId) {
      requests = requests.filter((req) => req.user_id === args.userId);
    }

    // Sort by created_at descending
    return requests.sort((a, b) => b.created_at - a.created_at);
  },
});

export const getRequestById = query({
  args: { id: v.id("requests") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createRequest = mutation({
  args: {
    user_id: v.id("users"),
    car_id: v.id("cars"),
    request_type: v.union(v.literal("rent"), v.literal("buy"), v.literal("sell")),
    with_driver: v.boolean(),
    deposit_amount: v.number(),
    total_amount: v.number(),
    event_date: v.union(v.number(), v.null()),
    event_type: v.union(v.string(), v.null()),
    agreement_text: v.union(v.string(), v.null()),
    payment_method: v.union(v.string(), v.null()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("requests", {
      ...args,
      status: "pending",
      created_at: now,
      updated_at: now,
    });
  },
});

export const updateRequestStatus = mutation({
  args: {
    id: v.id("requests"),
    status: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      updated_at: Date.now(),
    });
    return await ctx.db.get(args.id);
  },
});

export const updateCarAvailability = mutation({
  args: {
    car_id: v.id("cars"),
    availability_status: v.union(
      v.literal("available"),
      v.literal("rented"),
      v.literal("sold"),
      v.literal("maintenance")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.car_id, {
      availability_status: args.availability_status,
      updated_at: Date.now(),
    });
    return await ctx.db.get(args.car_id);
  },
});

export const deleteRequest = mutation({
  args: { id: v.id("requests") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});
