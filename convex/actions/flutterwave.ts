"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";
import crypto from "crypto";

const FLUTTERWAVE_URL = "https://api.flutterwave.com/v3/charges?type=mobile_money_rwanda";

/**
 * Initialize a Flutterwave Mobile Money Rwanda payment
 */
export const initializePayment = action({
    args: {
        amount: v.number(),
        phoneNumber: v.string(),
        email: v.string(),
        fullName: v.string(),
        tx_ref: v.string(),
    },
    handler: async (ctx, args) => {
        const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
        if (!secretKey) {
            throw new Error("FLUTTERWAVE_SECRET_KEY not set");
        }

        const response = await fetch(FLUTTERWAVE_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${secretKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tx_ref: args.tx_ref,
                amount: args.amount,
                currency: "RWF",
                email: args.email,
                phone_number: args.phoneNumber,
                fullname: args.fullName,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Flutterwave error:", data);
            throw new Error(data.message || "Failed to initialize Flutterwave payment");
        }

        return data;
    },
});

/**
 * Verify Flutterwave webhook signature
 */
export const verifyWebhook = action({
    args: {
        signature: v.string(),
        body: v.string(),
    },
    handler: async (ctx, args) => {
        const secretHash = process.env.FLUTTERWAVE_WEBHOOK_HASH;
        if (!secretHash) {
            console.warn("FLUTTERWAVE_WEBHOOK_HASH not set, skipping verification");
            return true;
        }

        // Flutterwave sends a secret hash in the header 'verif-hash'
        return args.signature === secretHash;
    },
});
