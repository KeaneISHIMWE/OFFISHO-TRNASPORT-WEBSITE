// Script to promote admin@offisho.com to admin role in production
import { ConvexHttpClient } from "convex/browser";
import { api } from "./convex/_generated/api";

const PRODUCTION_URL = "https://greedy-gull-254.convex.cloud";

async function promoteAdmin() {
    const client = new ConvexHttpClient(PRODUCTION_URL);

    try {
        console.log("🔍 Searching for admin@offisho.com in production database...");

        // Query all users to find the admin
        const users = await client.query(api.auth.getUserById, { userId: "" as any });

        console.log("Note: We need to use Convex dashboard to find the user ID");
        console.log("Go to: https://dashboard.convex.dev/deployment/greedy-gull-254/data");
        console.log("1. Click on 'users' table");
        console.log("2. Find the user with email: admin@offisho.com");
        console.log("3. Copy the _id value");
        console.log("4. Run: npx convex run auth:setUserRole '{\"userId\":\"<USER_ID>\",\"role\":\"admin\"}' --prod");

    } catch (error) {
        console.error("Error:", error);
    } finally {
        client.close();
    }
}

promoteAdmin();
