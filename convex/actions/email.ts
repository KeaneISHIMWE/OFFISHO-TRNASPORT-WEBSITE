"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import { api } from "../_generated/api";
import nodemailer from "nodemailer";

/**
 * Email Actions - External API calls for sending emails
 */

// Payment information (static)
const PAYMENT_INFO = {
    mtnMomo: "0 785 344 214",
    bankAccount: "Account: 2001161010013164, Bank: NCBA",
};

/**
 * Create email transporter
 */
function createTransporter() {
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

/**
 * Send request confirmation and admin notification emails
 */
export const sendRequestEmails = action({
    args: {
        requestId: v.id("requests"),
    },
    handler: async (ctx, args) => {
        // Get request details
        const request = await ctx.runQuery(api.requests.getById, {
            id: args.requestId,
        });

        if (!request) {
            throw new Error("Request not found");
        }

        const transporter = createTransporter();

        // Get user and car details
        const user = await ctx.runQuery(api.auth.getUserById, {
            userId: request.request.user_id,
        });
        const car = await ctx.runQuery(api.cars.getById, {
            id: request.request.car_id,
        });

        // Send confirmation email to user
        try {
            await transporter.sendMail({
                from: `"Offisho Transport" <${process.env.SMTP_USER}>`,
                to: user.user.email,
                subject: "Request Confirmation - Offisho Transport",
                html: generateRequestConfirmationEmail(
                    user.user.name,
                    request.request,
                    car.car
                ),
            });
            console.log(`✅ Request confirmation email sent to: ${user.user.email}`);
        } catch (error) {
            console.error("❌ Failed to send request confirmation email:", error);
        }

        // Send admin notification
        const adminEmails = [
            "prospertuop@gmail.com",
            "keaneishimwe@gmail.com",
        ];

        try {
            await transporter.sendMail({
                from: `"Offisho Transport" <${process.env.SMTP_USER}>`,
                to: adminEmails.join(", "),
                subject: `New ${request.request.request_type} Request - ${car.car.name} ${car.car.model}`,
                html: generateAdminNotificationEmail(request.request, car.car, user.user),
            });
            console.log(`✅ Admin notification email sent to: ${adminEmails.join(", ")}`);
        } catch (error) {
            console.error("❌ Failed to send admin notification email:", error);
        }
    },
});

/**
 * Send status update email
 */
export const sendStatusUpdateEmail = action({
    args: {
        requestId: v.id("requests"),
    },
    handler: async (ctx, args) => {
        const request = await ctx.runQuery(api.requests.getById, {
            id: args.requestId,
        });

        if (!request) {
            throw new Error("Request not found");
        }

        const user = await ctx.runQuery(api.auth.getUserById, {
            userId: request.request.user_id,
        });
        const car = await ctx.runQuery(api.cars.getById, {
            id: request.request.car_id,
        });

        const transporter = createTransporter();

        try {
            await transporter.sendMail({
                from: `"Offisho Transport" <${process.env.SMTP_USER}>`,
                to: user.user.email,
                subject: `Request Status Update - ${request.request.status.toUpperCase()}`,
                html: generateStatusUpdateEmail(
                    user.user.name,
                    request.request,
                    car.car
                ),
            });
            console.log(`✅ Status update email sent to: ${user.user.email}`);
        } catch (error) {
            console.error("❌ Failed to send status update email:", error);
        }
    },
});

/**
 * Send contact form email
 */
export const sendContactEmail = action({
    args: {
        name: v.string(),
        email: v.string(),
        message: v.string(),
    },
    handler: async (ctx, args) => {
        const adminEmails = [
            "prospertuop@gmail.com",
            process.env.ADMIN_EMAIL_SECONDARY || "keaneishimwe@gmail.com",
        ];

        const transporter = createTransporter();

        try {
            await transporter.sendMail({
                from: `"Offisho Transport" <${process.env.SMTP_USER}>`,
                to: adminEmails.join(", "),
                replyTo: args.email,
                subject: `New Contact Message from ${args.name}`,
                html: generateContactEmail(args.name, args.email, args.message),
            });
            console.log(`✅ Contact email sent to: ${adminEmails.join(", ")}`);
            return { message: "Message sent successfully" };
        } catch (error) {
            console.error("❌ Failed to send contact email:", error);
            throw new Error("Failed to send message");
        }
    },
});

/**
 * Email template generators
 */

function generateRequestConfirmationEmail(
    userName: string,
    request: any,
    car: any
): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #001F3F; color: #FFFFFF; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .details { background-color: #FFFFFF; padding: 15px; margin: 10px 0; border-left: 4px solid #87CEEB; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Offisho Transport</h1>
        </div>
        <div class="content">
          <h2>Hello ${userName},</h2>
          <p>Thank you for your request! We have received your booking and will process it shortly.</p>
          
          <div class="details">
            <h3>Request Details:</h3>
            <p><strong>Car:</strong> ${car.name} ${car.model}</p>
            <p><strong>Request Type:</strong> ${request.request_type.toUpperCase()}</p>
            ${request.with_driver ? '<p><strong>With Driver:</strong> Yes (+10,000 FRW)</p>' : ''}
            ${request.deposit_amount > 0 ? `<p><strong>Deposit:</strong> ${request.deposit_amount.toLocaleString()} FRW (refundable)</p>` : ''}
            <p><strong>Total Amount:</strong> ${request.total_amount.toLocaleString()} FRW</p>
            ${request.event_date ? `<p><strong>Event Date:</strong> ${new Date(request.event_date).toLocaleDateString()}</p>` : ''}
            ${request.event_type ? `<p><strong>Event Type:</strong> ${request.event_type}</p>` : ''}
            <p><strong>Status:</strong> ${request.status}</p>
          </div>

          <div class="details">
            <h3>Payment Information:</h3>
            <p><strong>MTN MoMo:</strong> ${PAYMENT_INFO.mtnMomo}</p>
            <p><strong>Bank Transfer:</strong> ${PAYMENT_INFO.bankAccount}</p>
            <p>Please make payment using one of the methods above and include your request ID: <strong>${request._id}</strong></p>
          </div>

          <p>We will review your request and notify you once it's approved.</p>
          <p>If you have any questions, please contact us.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Offisho Transport. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateAdminNotificationEmail(
    request: any,
    car: any,
    user: any
): string {
    const phoneDisplay = user.phone_number || '<span style="color: #999; font-style: italic;">Not provided</span>';

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #001F3F; color: #FFFFFF; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .details { background-color: #FFFFFF; padding: 15px; margin: 10px 0; border-left: 4px solid #87CEEB; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .contact-info { margin: 8px 0; line-height: 1.8; }
        .contact-label { font-weight: bold; color: #333; margin-right: 8px; }
        a { color: #0066cc; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Request Notification</h1>
        </div>
        <div class="content">
          <h2>New ${request.request_type} request received</h2>
          
          <div class="details">
            <h3>Request Details:</h3>
            <p><strong>Request ID:</strong> ${request._id}</p>
            <p><strong>Car:</strong> ${car.name} ${car.model}</p>
            <p><strong>Request Type:</strong> ${request.request_type.toUpperCase()}</p>
            <p><strong>Total Amount:</strong> ${request.total_amount.toLocaleString()} FRW</p>
          </div>

          <div class="details">
            <h3>Customer Information:</h3>
            <p class="contact-info"><span class="contact-label">Name:</span> ${user.name}</p>
            <p class="contact-info"><span class="contact-label">Email:</span> <a href="mailto:${user.email}">${user.email}</a></p>
            <p class="contact-info"><span class="contact-label">Phone:</span> ${phoneDisplay}</p>
          </div>

          <p>Please review and process this request in the admin portal.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Offisho Transport. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateStatusUpdateEmail(
    userName: string,
    request: any,
    car: any
): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #001F3F; color: #FFFFFF; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .details { background-color: #FFFFFF; padding: 15px; margin: 10px 0; border-left: 4px solid #87CEEB; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .status-approved { color: #28a745; font-weight: bold; }
        .status-rejected { color: #dc3545; font-weight: bold; }
        .status-completed { color: #17a2b8; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Offisho Transport</h1>
        </div>
        <div class="content">
          <h2>Hello ${userName},</h2>
          <p>Your request status has been updated.</p>
          
          <div class="details">
            <h3>Request Details:</h3>
            <p><strong>Car:</strong> ${car.name} ${car.model}</p>
            <p><strong>Request Type:</strong> ${request.request_type.toUpperCase()}</p>
            <p><strong>Total Amount:</strong> ${request.total_amount.toLocaleString()} FRW</p>
            <p><strong>Status:</strong> <span class="status-${request.status}">${request.status.toUpperCase()}</span></p>
          </div>

          ${request.status === 'approved' ? `
            <p>Your request has been approved! Please proceed with payment if you haven't already.</p>
            <div class="details">
              <h3>Payment Information:</h3>
              <p><strong>MTN MoMo:</strong> ${PAYMENT_INFO.mtnMomo}</p>
              <p><strong>Bank Transfer:</strong> ${PAYMENT_INFO.bankAccount}</p>
            </div>
          ` : ''}

          ${request.status === 'rejected' ? `
            <p>Unfortunately, your request has been rejected. If you have any questions, please contact us.</p>
          ` : ''}

          ${request.status === 'completed' && request.deposit_amount > 0 ? `
            <p>Your rental has been completed. Your deposit of ${request.deposit_amount.toLocaleString()} FRW will be refunded if no damage was reported.</p>
          ` : ''}

          <p>If you have any questions, please contact us.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Offisho Transport. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateContactEmail(
    name: string,
    email: string,
    message: string
): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #001F3F; color: #FFFFFF; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .details { background-color: #FFFFFF; padding: 15px; margin: 10px 0; border-left: 4px solid #87CEEB; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Message</h1>
        </div>
        <div class="content">
          <div class="details">
            <h3>Sender Information:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>

          <div class="details">
            <h3>Message:</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Offisho Transport. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
