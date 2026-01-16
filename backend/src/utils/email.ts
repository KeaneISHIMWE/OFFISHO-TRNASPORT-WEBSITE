import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Payment information (static)
const PAYMENT_INFO = {
  mtnMomo: '+250 788 123 456',
  bankAccount: 'Account: 1234567890, Bank: Bank of Rwanda',
};

export const sendRequestConfirmationEmail = async (
  userEmail: string,
  userName: string,
  request: any,
  car: any
): Promise<void> => {
  const mailOptions = {
    from: `"Offisho Transport" <${process.env.SMTP_USER}>`,
    to: userEmail,
    subject: 'Request Confirmation - Offisho Transport',
    html: `
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
          .button { background-color: #87CEEB; color: #001F3F; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
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
              <p>Please make payment using one of the methods above and include your request ID: <strong>${request.id}</strong></p>
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
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendAdminNotificationEmail = async (
  request: any,
  car: any,
  user: any
): Promise<void> => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

  const mailOptions = {
    from: `"Offisho Transport" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `New ${request.request_type} Request - ${car.name} ${car.model}`,
    html: `
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
            <h1>New Request Notification</h1>
          </div>
          <div class="content">
            <h2>New ${request.request_type} request received</h2>
            
            <div class="details">
              <h3>Request Details:</h3>
              <p><strong>Request ID:</strong> ${request.id}</p>
              <p><strong>Car:</strong> ${car.name} ${car.model}</p>
              <p><strong>Request Type:</strong> ${request.request_type.toUpperCase()}</p>
              <p><strong>Total Amount:</strong> ${request.total_amount.toLocaleString()} FRW</p>
            </div>

            <div class="details">
              <h3>Customer Information:</h3>
              <p><strong>Name:</strong> ${user.name}</p>
              <p><strong>Email:</strong> ${user.email}</p>
            </div>

            <p>Please review and process this request in the admin portal.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Offisho Transport. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const sendStatusUpdateEmail = async (
  userEmail: string,
  userName: string,
  request: any,
  carDetails: any
): Promise<void> => {
  const mailOptions = {
    from: `"Offisho Transport" <${process.env.SMTP_USER}>`,
    to: userEmail,
    subject: `Request Status Update - ${request.status.toUpperCase()}`,
    html: `
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
              <p><strong>Car:</strong> ${carDetails.car_name} ${carDetails.car_model}</p>
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
    `,
  };

  await transporter.sendMail(mailOptions);
};
