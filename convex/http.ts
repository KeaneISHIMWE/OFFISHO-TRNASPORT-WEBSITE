import { httpRouter } from "convex/server";
import { auth } from "./auth";

const http = httpRouter();

auth.addHttpRoutes(http);

import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

// Flutterwave Webhook Handler
http.route({
    path: "/flutterwave-webhook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const signature = request.headers.get("verif-hash") || "";
        const bodyText = await request.text();

        // Verify signature
        const secretHash = process.env.FLUTTERWAVE_WEBHOOK_HASH;
        if (secretHash && signature !== secretHash) {
            console.error("Invalid Flutterwave webhook signature");
            return new Response("Unauthorized", { status: 401 });
        }

        const payload = JSON.parse(bodyText);
        const { status, tx_ref, id } = payload.data;

        // Update payment status based on webhook
        if (status === "successful") {
            await ctx.runMutation(api.payments.updatePaymentStatus, {
                tx_ref,
                status: "successful",
                flutterwaveId: String(id),
            });
        } else if (status === "failed") {
            await ctx.runMutation(api.payments.updatePaymentStatus, {
                tx_ref,
                status: "failed",
                flutterwaveId: String(id),
            });
        }

        return new Response("OK", { status: 200 });
    }),
});

export default http;
