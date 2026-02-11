import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/auth";

/**
 * Cars Queries and Mutations
 */

/**
 * Get all cars with optional filters
 */
export const list = query({
    args: {
        type: v.optional(v.string()),
        minPrice: v.optional(v.number()),
        maxPrice: v.optional(v.number()),
        availability: v.optional(v.string()),
        search: v.optional(v.string()),
        eventType: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        let cars;

        // Apply filters using indexes where possible
        if (args.type) {
            cars = await ctx.db.query("cars")
                .withIndex("by_car_type", (q) => q.eq("car_type", args.type as any))
                .collect();
        } else if (args.availability) {
            cars = await ctx.db.query("cars")
                .withIndex("by_availability", (q) => q.eq("availability_status", args.availability as any))
                .collect();
        } else {
            cars = await ctx.db.query("cars").collect();
        }

        // Apply additional filters
        if (args.minPrice !== undefined) {
            cars = cars.filter((car) => car.rental_price_per_day >= args.minPrice!);
        }

        if (args.maxPrice !== undefined) {
            cars = cars.filter((car) => car.rental_price_per_day <= args.maxPrice!);
        }

        if (args.search) {
            const searchLower = args.search.toLowerCase();
            cars = cars.filter(
                (car) =>
                    car.name.toLowerCase().includes(searchLower) ||
                    car.model.toLowerCase().includes(searchLower) ||
                    car.description?.toLowerCase().includes(searchLower)
            );
        }

        if (args.eventType) {
            cars = cars.filter(
                (car) =>
                    car.event_suitability &&
                    car.event_suitability.includes(args.eventType!)
            );
        }

        // Resolve image URLs
        const carsWithImages = await Promise.all(
            cars.map(async (car) => {
                if (car.storageId) {
                    return {
                        ...car,
                        image_url: await ctx.storage.getUrl(car.storageId) || car.image_url,
                    };
                }
                return car;
            })
        );

        return { cars: carsWithImages };
    },
});

/**
 * Get car by ID
 */
export const getById = query({
    args: {
        id: v.id("cars"),
    },
    handler: async (ctx, args) => {
        const car = await ctx.db.get(args.id);
        if (!car) {
            throw new Error("Car not found");
        }
        if (car.storageId) {
            car.image_url = await ctx.storage.getUrl(car.storageId) || car.image_url;
        }
        return { car };
    },
});

/**
 * Create a new car (admin only)
 */
export const create = mutation({
    args: {
        name: v.string(),
        model: v.string(),
        description: v.optional(v.string()),
        image_url: v.optional(v.string()),
        storageId: v.optional(v.id("_storage")),
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
        await requireAdmin(ctx);
        const carId = await ctx.db.insert("cars", {
            name: args.name,
            model: args.model,
            description: args.description,
            image_url: args.image_url,
            storageId: args.storageId,
            rental_price_per_day: args.rental_price_per_day,
            buy_price: args.buy_price,
            sell_price: args.sell_price,
            car_type: args.car_type,
            event_suitability: args.event_suitability,
            availability_status: args.availability_status || "available",
            specs: args.specs,
        });

        const car = await ctx.db.get(carId);
        return { message: "Car created successfully", car };
    },
});

/**
 * Update a car (admin only)
 */
export const update = mutation({
    args: {
        id: v.id("cars"),
        name: v.optional(v.string()),
        model: v.optional(v.string()),
        description: v.optional(v.string()),
        image_url: v.optional(v.string()),
        storageId: v.optional(v.id("_storage")),
        rental_price_per_day: v.optional(v.number()),
        buy_price: v.optional(v.number()),
        sell_price: v.optional(v.number()),
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
        await requireAdmin(ctx);
        const { id, ...updates } = args;

        // Check if car exists
        const existingCar = await ctx.db.get(id);
        if (!existingCar) {
            throw new Error("Car not found");
        }

        // Remove undefined values
        const cleanUpdates = Object.fromEntries(
            Object.entries(updates).filter(([_, v]) => v !== undefined)
        );

        await ctx.db.patch(id, cleanUpdates);

        const car = await ctx.db.get(id);
        return { message: "Car updated successfully", car };
    },
});

/**
 * Delete a car (admin only)
 */
export const remove = mutation({
    args: {
        id: v.id("cars"),
    },
    handler: async (ctx, args) => {
        await requireAdmin(ctx);
        // Check if car exists
        const car = await ctx.db.get(args.id);
        if (!car) {
            throw new Error("Car not found");
        }

        // Check if there are any active requests for this car
        const activeRequests = await ctx.db
            .query("requests")
            .withIndex("by_car", (q) => q.eq("car_id", args.id))
            .filter((q) =>
                q.or(
                    q.eq(q.field("status"), "pending"),
                    q.eq(q.field("status"), "approved")
                )
            )
            .collect();

        if (activeRequests.length > 0) {
            throw new Error(
                "Cannot delete car with active requests. Please complete or cancel all requests first."
            );
        }


        await ctx.db.delete(args.id);
        return { message: "Car deleted successfully" };
    },
});

/**
 * Generate upload URL for file storage
 */
export const generateUploadUrl = mutation(async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
});
