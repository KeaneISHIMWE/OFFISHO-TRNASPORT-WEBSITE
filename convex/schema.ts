import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

/**
 * Convex Schema for Offisho Transport
 * Migrated from MySQL schema and integrated with Convex Auth
 */
export default defineSchema({
    ...authTables,

    // Extend or modify the default users table if needed
    // The authTables includes 'users', 'sessions', 'accounts', 'verifications'
    // We overlay our custom profile fields onto the 'users' table
    users: defineTable({
        name: v.optional(v.string()),
        email: v.optional(v.string()),
        image: v.optional(v.string()),
        phone_number: v.optional(v.string()),
        role: v.optional(v.union(v.literal("user"), v.literal("admin"))),
    })
        .index("by_email", ["email"]),

    // Cars table - Vehicle inventory
    cars: defineTable({
        name: v.string(),
        model: v.string(),
        description: v.optional(v.string()),
        image_url: v.optional(v.string()), // Cloudinary URL
        storageId: v.optional(v.id("_storage")), // Convex Storage ID
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
        event_suitability: v.optional(v.array(v.string())), // e.g., ["wedding", "corporate"]
        availability_status: v.union(
            v.literal("available"),
            v.literal("rented"),
            v.literal("sold"),
            v.literal("maintenance")
        ),
        specs: v.optional(v.any()), // Flexible JSON object for car specifications
    })
        .index("by_car_type", ["car_type"])
        .index("by_availability", ["availability_status"])
        .index("by_type_and_availability", ["car_type", "availability_status"]),

    // Requests table - Rental/purchase requests
    requests: defineTable({
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
        .index("by_status", ["status"])
        .index("by_user_and_status", ["user_id", "status"]),

    // Payments table - Payment tracking (Flutterwave integration)
    payments: defineTable({
        userId: v.id("users"),
        requestId: v.optional(v.id("requests")),
        amount: v.number(),
        phoneNumber: v.string(),
        tx_ref: v.string(),
        status: v.union(
            v.literal("pending"),
            v.literal("successful"),
            v.literal("failed"),
            v.literal("refunded")
        ),
        flutterwaveId: v.optional(v.string()),
        payment_method: v.string(),
        createdAt: v.number(),
    })
        .index("by_user", ["userId"])
        .index("by_tx_ref", ["tx_ref"])
        .index("by_status", ["status"]),

    // Contacts table - Contact form submissions
    contacts: defineTable({
        fullName: v.string(),
        email: v.string(),
        subject: v.string(),
        message: v.string(),
        status: v.union(v.literal("new"), v.literal("read"), v.literal("replied")),
    })
        .index("by_status", ["status"]),
});
