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
    console.error('❌ Email transporter configuration error:', error);
    console.error('Please check your SMTP environment variables:');
    console.error('  SMTP_HOST:', process.env.SMTP_HOST || 'NOT SET');
    console.error('  SMTP_PORT:', process.env.SMTP_PORT || 'NOT SET');
    console.error('  SMTP_USER:', process.env.SMTP_USER || 'NOT SET');
    console.error('  SMTP_PASS:', process.env.SMTP_PASS ? '***SET***' : 'NOT SET');
  } else {
    console.log('✅ Email server is ready to send messages');
    console.log('📧 Sending from:', process.env.SMTP_USER);
  }
});

// Payment information (static)
const PAYMENT_INFO = {
  mtnMomo: '0 785 344 214',
  bankAccount: 'Account: 2001161010013164, Bank: NCBA',
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

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Request confirmation email sent to: ${userEmail}`);
  } catch (error: any) {
    console.error('❌ Failed to send request confirmation email:', error);
    throw error;
  }
};

export const sendAdminNotificationEmail = async (
  request: any,
  car: any,
  user: any
): Promise<void> => {
  // Send to multiple admin emails - primary admin first
  const adminEmails = ['prospertuop@gmail.com', 'keaneishimwe@gmail.com'];

  // Determine phone number display value - handle null, undefined, and empty strings
  let phoneDisplay = '<span style="color: #999; font-style: italic;">Not provided</span>';
  
  // More robust check for phone number
  try {
    if (user && user.phone_number != null) {
      const phoneValue = user.phone_number;
      if (typeof phoneValue === 'string' || typeof phoneValue === 'number') {
        const phoneStr = String(phoneValue).trim();
        if (phoneStr && phoneStr.length > 0 && phoneStr !== 'null' && phoneStr !== 'undefined') {
          phoneDisplay = phoneStr;
        }
      }
    }
  } catch (error) {
    // If phone number processing fails, use default
    // Silently fail to prevent deployment issues
  }

  const mailOptions = {
    from: `"Offisho Transport" <${process.env.SMTP_USER}>`,
    to: adminEmails.join(', '),
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
          .contact-info { margin: 8px 0; line-height: 1.8; }
          .contact-label { font-weight: bold; color: #333; margin-right: 8px; }
          .contact-value { color: #0066cc; }
          a { color: #0066cc; text-decoration: none; }
          a:hover { text-decoration: underline; }
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
              <p class="contact-info"><span class="contact-label">Name:</span> ${user.name || 'N/A'}</p>
              <p class="contact-info"><span class="contact-label">Email:</span> <a href="mailto:${user.email}">${user.email || 'N/A'}</a></p>
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
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Admin notification email sent to: ${adminEmails.join(', ')}`);
  } catch (error: any) {
    console.error('❌ Failed to send admin notification email:', error);
    throw error;
  }
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

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Status update email sent to: ${userEmail}`);
  } catch (error: any) {
    console.error('❌ Failed to send status update email:', error);
    throw error;
  }
};

export const sendContactEmail = async (
  name: string,
  email: string,
  message: string
): Promise<void> => {
  // Send to primary admin email
  const adminEmail = 'prospertuop@gmail.com';
  
  // Also send to secondary admin if configured
  const secondaryAdminEmail = process.env.ADMIN_EMAIL_SECONDARY || 'keaneishimwe@gmail.com';
  const recipientEmails = [adminEmail, secondaryAdminEmail].filter(Boolean).join(', ');

  const mailOptions = {
    from: `"Offisho Transport" <${process.env.SMTP_USER}>`,
    to: recipientEmails,
    replyTo: email,
    subject: `New Contact Message from ${name}`,
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
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Contact email sent successfully to: ${recipientEmails}`);
  } catch (error: any) {
    console.error('❌ Failed to send contact email:', error);
    console.error('Error details:', {
      code: error.code,
      command: error.command,
      response: error.response,
    });
    throw error; // Re-throw to let caller handle it
  }
};
