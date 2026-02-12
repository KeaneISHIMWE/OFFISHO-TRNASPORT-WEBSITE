import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { requireAdmin, requireAuth, requireAuthId, requireOwnerOrAdmin } from "./lib/auth";

/**
 * Requests Queries and Mutations
 * Note: Auth checks temporarily removed for simplification
 */

const DRIVER_FEE = 10000; // 10,000 FRW
const DEPOSIT_AMOUNT = 50000; // 50,000 FRW (refundable)

/**
 * Get all requests
 */
export const list = query({
    args: {},
    handler: async (ctx) => {
        await requireAdmin(ctx);
        const requests = await ctx.db.query("requests").collect();

        // Enrich with car and user details
        const enrichedRequests = await Promise.all(
            requests.map(async (request) => {
                const car = await ctx.db.get(request.car_id);
                const user = await ctx.db.get(request.user_id);

                return {
                    ...request,
                    car_name: car?.name,
                    car_model: car?.model,
                    user_name: user?.name,
                    user_email: user?.email,
                };
            })
        );

        return { requests: enrichedRequests };
    },
});

/**
 * Get request by ID
 */
export const getById = query({
    args: {
        id: v.id("requests"),
    },
    handler: async (ctx, args) => {
        const request = await ctx.db.get(args.id);

        if (!request) {
            throw new Error("Request not found");
        }

        // Enrich with car and user details
        const car = await ctx.db.get(request.car_id);
        const user = await ctx.db.get(request.user_id);

        return {
            request: {
                ...request,
                car_name: car?.name,
                car_model: car?.model,
                user_name: user?.name,
                user_email: user?.email,
            },
        };
    },
});

/**
 * Create a new request
 * Note: user_id must be passed from frontend
 */
export const create = mutation({
    args: {
        car_id: v.id("cars"),
        request_type: v.union(
            v.literal("rent"),
            v.literal("buy"),
            v.literal("sell")
        ),
        with_driver: v.optional(v.boolean()),
        event_date: v.optional(v.string()),
        event_type: v.optional(v.string()),
        agreement_text: v.optional(v.string()),
        payment_method: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const userId = await requireAuthId(ctx);
        // Get car details
        const car = await ctx.db.get(args.car_id);
        if (!car) {
            throw new Error("Car not found");
        }

        // Check car availability
        if (car.availability_status !== "available") {
            throw new Error("Car is not available");
        }

        // Calculate total amount
        let total_amount = 0;
        let deposit_amount = 0;

        if (args.request_type === "rent") {
            total_amount = car.rental_price_per_day;
            if (args.with_driver) {
                total_amount += DRIVER_FEE;
            }
            deposit_amount = DEPOSIT_AMOUNT;
        } else if (args.request_type === "buy") {
            total_amount = car.buy_price || 0;
        } else if (args.request_type === "sell") {
            total_amount = car.sell_price || 0;
        }

        // Create request
        const requestId = await ctx.db.insert("requests", {
            user_id: userId,
            car_id: args.car_id,
            request_type: args.request_type,
            with_driver: args.with_driver,
            deposit_amount,
            total_amount,
            event_date: args.event_date,
            event_type: args.event_type,
            status: "pending",
            agreement_text: args.agreement_text,
            payment_method: args.payment_method,
        });

        const request = await ctx.db.get(requestId);

        // Schedule email notifications (using action)
        try {
            await ctx.scheduler.runAfter(0, api.actions.email.sendRequestEmails, {
                requestId,
            });
        } catch (error) {
            console.error("Failed to schedule email:", error);
        }

        return {
            message: "Request created successfully",
            request,
        };
    },
});

/**
 * Update request status
 */
export const updateStatus = mutation({
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
        await requireAdmin(ctx);
        const request = await ctx.db.get(args.id);
        if (!request) {
            throw new Error("Request not found");
        }

        // Update request status
        await ctx.db.patch(args.id, { status: args.status });

        // Update car availability based on status
        if (args.status === "approved" && request.request_type === "rent") {
            await ctx.db.patch(request.car_id, { availability_status: "rented" });
        } else if (args.status === "approved" && request.request_type === "buy") {
            await ctx.db.patch(request.car_id, { availability_status: "sold" });
        } else if (
            args.status === "completed" ||
            args.status === "rejected" ||
            args.status === "cancelled"
        ) {
            // Make car available again
            const car = await ctx.db.get(request.car_id);
            if (car && car.availability_status !== "sold") {
                await ctx.db.patch(request.car_id, {
                    availability_status: "available",
                });
            }
        }

        const updatedRequest = await ctx.db.get(args.id);

        // Schedule status update email
        try {
            await ctx.scheduler.runAfter(0, api.actions.email.sendStatusUpdateEmail, {
                requestId: args.id,
            });
        } catch (error) {
            console.error("Failed to schedule email:", error);
        }

        return {
            message: "Request status updated successfully",
            request: updatedRequest,
        };
    },
});

/**
 * Delete a request
 */
export const remove = mutation({
    args: {
        id: v.id("requests"),
    },
    handler: async (ctx, args) => {
        const request = await ctx.db.get(args.id);
        if (!request) {
            throw new Error("Request not found");
        }
        await requireOwnerOrAdmin(ctx, request.user_id);

        // Only allow deletion of pending or rejected requests
        if (request.status !== "pending" && request.status !== "rejected") {
            throw new Error(
                "Cannot delete request with status: " + request.status
            );
        }

        await ctx.db.delete(args.id);

        return { message: "Request deleted successfully" };
    },
});
/**
 * Get requests for the current authenticated user
 */
export const listByUser = query({
    args: {},
    handler: async (ctx) => {
        const userId = await requireAuthId(ctx);
        const requests = await ctx.db
            .query("requests")
            .withIndex("by_user", (q) => q.eq("user_id", userId))
            .collect();

        // Enrich with car details
        const enrichedRequests = await Promise.all(
            requests.map(async (request) => {
                const car = await ctx.db.get(request.car_id);
                return {
                    ...request,
                    car_name: car?.name,
                    car_model: car?.model,
                    car_image: car?.storageId
                        ? await ctx.storage.getUrl(car.storageId)
                        : car?.image_url,
                };
            })
        );

        return { requests: enrichedRequests };
    },
});
