import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { requireAuthId } from "./lib/auth";

/**
 * Initialize a payment record and trigger Flutterwave action
 */
export const requestPayment = mutation({
    args: {
        amount: v.number(),
        phoneNumber: v.string(),
        requestId: v.optional(v.id("requests")),
    },
    handler: async (ctx, args) => {
        const userId = await requireAuthId(ctx);
        const user = await ctx.db.get(userId);

        if (!user) throw new Error("User not found");

        const tx_ref = `OFFISHO-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const paymentId = await ctx.db.insert("payments", {
            userId,
            requestId: args.requestId,
            amount: args.amount,
            phoneNumber: args.phoneNumber,
            tx_ref,
            status: "pending",
            payment_method: "mobile_money_rwanda",
            createdAt: Date.now(),
        });

        // Schedule the Flutterwave action to run asynchronously
        await ctx.scheduler.runAfter(0, api.actions.flutterwave.initializePayment, {
            amount: args.amount,
            phoneNumber: args.phoneNumber,
            email: user.email || "customer@offisho.rw",
            fullName: user.name || "Customer",
            tx_ref,
        });

        return {
            paymentId,
            tx_ref,
            message: "Payment initialized. Check your phone for MTN MoMo prompt.",
        };
    },
});

/**
 * Update payment status (called by webhook action)
 */
export const updatePaymentStatus = mutation({
    args: {
        tx_ref: v.string(),
        status: v.union(v.literal("successful"), v.literal("failed")),
        flutterwaveId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const payment = await ctx.db
            .query("payments")
            .withIndex("by_tx_ref", (q) => q.eq("tx_ref", args.tx_ref))
            .first();

        if (!payment) {
            console.error(`Payment not found for tx_ref: ${args.tx_ref}`);
            return;
        }

        await ctx.db.patch(payment._id, {
            status: args.status,
            flutterwaveId: args.flutterwaveId,
        });

        // If payment is successful and linked to a request, update request status or add a note
        if (args.status === "successful" && payment.requestId) {
            // You could update request status here if needed
            // await ctx.db.patch(payment.requestId, { status: "approved" });
            console.log(`Payment successful for request: ${payment.requestId}`);
        }
    },
});

/**
 * Get payment status
 */
export const getStatus = query({
    args: { tx_ref: v.string() },
    handler: async (ctx, args) => {
        const payment = await ctx.db
            .query("payments")
            .withIndex("by_tx_ref", (q) => q.eq("tx_ref", args.tx_ref))
            .first();
        return payment?.status || null;
    },
});
