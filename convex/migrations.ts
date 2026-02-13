import { v } from "convex/values";
import { mutation } from "./_generated/server";

/**
 * Migration Mutations
 * These mutations are ONLY for data migration from MySQL.
 * They bypass normal validation and auth checks.
 * 
 * ⚠️ SECURITY WARNING: Remove these after migration is complete!
 */

/**
 * Migrate a user from MySQL
 */
export const migrateUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        phone_number: v.optional(v.string()),
        role: v.union(v.literal("user"), v.literal("admin")),
    },
    handler: async (ctx, args) => {
        // Check if user already exists
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email))
            .first();

        if (existingUser) {
            console.log(`User ${args.email} already exists, skipping`);
            return { userId: existingUser._id, existed: true };
        }

        const userId = await ctx.db.insert("users", {
            name: args.name,
            email: args.email,
            phone_number: args.phone_number,
            role: args.role,
        });

        return { userId, existed: false };
    },
});

/**
 * Migrate a car from MySQL
 */
export const migrateCar = mutation({
    args: {
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
        specs: v.optional(v.any()),
    },
    handler: async (ctx, args) => {
        const carId = await ctx.db.insert("cars", {
            name: args.name,
            model: args.model,
            description: args.description,
            image_url: args.image_url,
            rental_price_per_day: args.rental_price_per_day,
            buy_price: args.buy_price,
            sell_price: args.sell_price,
            car_type: args.car_type,
            event_suitability: args.event_suitability,
            availability_status: args.availability_status,
            specs: args.specs,
        });

        return { carId };
    },
});

/**
 * Migrate a request from MySQL
 */
export const migrateRequest = mutation({
    args: {
        user_id: v.id("users"),
        car_id: v.id("cars"),
        request_type: v.union(
            v.literal("rent"),
            v.literal("buy"),
            v.literal("sell")
        ),
        with_driver: v.optional(v.boolean()),
        deposit_amount: v.optional(v.number()),
        total_amount: v.number(),
        event_date: v.optional(v.string()),
        event_type: v.optional(v.string()),
        status: v.union(
            v.literal("pending"),
            v.literal("approved"),
            v.literal("rejected"),
            v.literal("completed"),
            v.literal("cancelled")
        ),
        agreement_text: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const requestId = await ctx.db.insert("requests", {
            user_id: args.user_id,
            car_id: args.car_id,
            request_type: args.request_type,
            with_driver: args.with_driver,
            deposit_amount: args.deposit_amount,
            total_amount: args.total_amount,
            event_date: args.event_date,
            event_type: args.event_type,
            status: args.status,
            agreement_text: args.agreement_text,
        });

        return { requestId };
    },
});

/**
 * Get migration statistics
 */
export const getMigrationStats = mutation({
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db.query("users").collect();
        const cars = await ctx.db.query("cars").collect();
        const requests = await ctx.db.query("requests").collect();

        return {
            users: users.length,
            cars: cars.length,
            requests: requests.length,
        };
    },
});
