import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCars = query({
  args: {
    type: v.optional(v.string()),
    minPrice: v.optional(v.number()),
    maxPrice: v.optional(v.number()),
    availability: v.optional(v.string()),
    search: v.optional(v.string()),
    eventType: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let cars = await ctx.db.query("cars").collect();

    // Apply filters
    if (args.type) {
      cars = cars.filter((car) => car.car_type === args.type);
    }
    if (args.minPrice) {
      cars = cars.filter((car) => car.rental_price_per_day >= args.minPrice!);
    }
    if (args.maxPrice) {
      cars = cars.filter((car) => car.rental_price_per_day <= args.maxPrice!);
    }
    if (args.availability) {
      cars = cars.filter((car) => car.availability_status === args.availability);
    }
    if (args.search) {
      const searchLower = args.search.toLowerCase();
      cars = cars.filter(
        (car) =>
          car.name.toLowerCase().includes(searchLower) ||
          car.model.toLowerCase().includes(searchLower) ||
          (car.description && car.description.toLowerCase().includes(searchLower))
      );
    }
    if (args.eventType) {
      cars = cars.filter((car) =>
        car.event_suitability.includes(args.eventType!)
      );
    }

    return cars.sort((a, b) => b.created_at - a.created_at);
  },
});

export const getCarById = query({
  args: { id: v.id("cars") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createCar = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("cars", {
      ...args,
      created_at: now,
      updated_at: now,
    });
  },
});

export const updateCar = mutation({
  args: {
    id: v.id("cars"),
    name: v.optional(v.string()),
    model: v.optional(v.string()),
    description: v.optional(v.union(v.string(), v.null())),
    image_url: v.optional(v.union(v.string(), v.null())),
    rental_price_per_day: v.optional(v.number()),
    buy_price: v.optional(v.union(v.number(), v.null())),
    sell_price: v.optional(v.union(v.number(), v.null())),
    car_type: v.optional(
      v.union(
        v.literal("luxury"),
        v.literal("suv"),
        v.literal("sedan"),
        v.literal("convertible"),
        v.literal("van")
      )
    ),
    event_suitability: v.optional(v.array(v.string())),
    availability_status: v.optional(
      v.union(
        v.literal("available"),
        v.literal("rented"),
        v.literal("sold"),
        v.literal("maintenance")
      )
    ),
    specs: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updated_at: Date.now(),
    });
    return await ctx.db.get(id);
  },
});

export const deleteCar = mutation({
  args: { id: v.id("cars") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});
