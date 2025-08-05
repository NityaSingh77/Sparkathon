import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // divyanshvijay92@gmail.com
        pass: process.env.EMAIL_PASS, // App password from Google
    },
    tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3'
    },
    requireTLS: true,
    logger: true,
    debug: true
});

const SIRN_LOGO = "/logo.jpg"; // Replace with actual logo URL
const COMPANY_NAME = "SIRN - Smart Inventory Redistribution Network";
const SUPPORT_EMAIL = "support@sirn.com";

const emailBase = (titleColor, titleText, bodyContent) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
    
    <!-- Header -->
    <div style="background-color: #043980; padding: 20px; text-align: center;">
      <img src="${SIRN_LOGO}" alt="SIRN Logo" style="max-height: 50px;">
      <h1 style="color: #fff; font-size: 20px; margin-top: 10px;">${COMPANY_NAME}</h1>
    </div>

    <!-- Title Section -->
    <div style="background-color: ${titleColor}; color: #fff; text-align: center; padding: 15px;">
      <h2 style="margin: 0; font-size: 22px;">${titleText}</h2>
    </div>

    <!-- Body -->
    <div style="padding: 20px; background-color: #fff; color: #333;">
      ${bodyContent}
    </div>

    <!-- Footer -->
    <div style="background-color: #f7f7f7; padding: 15px; text-align: center; font-size: 12px; color: #666;">
      <p>© ${new Date().getFullYear()} ${COMPANY_NAME}. All rights reserved.</p>
      <p>Need help? Contact us at <a href="mailto:${SUPPORT_EMAIL}" style="color: #043980;">${SUPPORT_EMAIL}</a></p>
    </div>
  </div>
`;

const emailTemplates = {
  approve: (data) => ({
    source: {
      subject: `Transfer Approved - ${data.productName} to ${data.toStore}`,
      html: emailBase(
        "#28a745",
        "Transfer Approved",
        `
          <p>Dear Source Store Manager,</p>
          <p>Your suggested transfer has been <strong>approved</strong>.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td><strong>From Your Store:</strong></td><td>${data.fromStore}</td></tr>
            <tr><td><strong>To Store:</strong></td><td>${data.toStore}</td></tr>
            <tr><td><strong>Product:</strong></td><td>${data.productName}</td></tr>
            <tr><td><strong>Quantity:</strong></td><td>${data.quantity}</td></tr>
            <tr><td><strong>Estimated Savings:</strong></td><td>$${data.estimatedSavings}</td></tr>
            <tr><td><strong>Approved By:</strong></td><td>${data.approvedBy}</td></tr>
            <tr><td><strong>Approved At:</strong></td><td>${new Date().toLocaleString()}</td></tr>
          </table>
          <p style="margin-top: 15px;">Please arrange shipment as per standard procedure.</p>
        `
      )
    },
    destination: {
      subject: `Incoming Transfer Approved - ${data.productName} from ${data.fromStore}`,
      html: emailBase(
        "#28a745",
        "Incoming Transfer Approved",
        `
          <p>Dear Destination Store Manager,</p>
          <p>A stock transfer to your store has been <strong>approved</strong>.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td><strong>From Store:</strong></td><td>${data.fromStore}</td></tr>
            <tr><td><strong>To Your Store:</strong></td><td>${data.toStore}</td></tr>
            <tr><td><strong>Product:</strong></td><td>${data.productName}</td></tr>
            <tr><td><strong>Quantity:</strong></td><td>${data.quantity}</td></tr>
            <tr><td><strong>Network Savings:</strong></td><td>$${data.estimatedSavings}</td></tr>
            <tr><td><strong>Approved By:</strong></td><td>${data.approvedBy}</td></tr>
            <tr><td><strong>Approved At:</strong></td><td>${new Date().toLocaleString()}</td></tr>
          </table>
          <p style="margin-top: 15px;">Prepare to receive shipment as per schedule.</p>
        `
      )
    }
  }),

  reject: (data) => ({
    source: {
      subject: `Transfer Rejected - ${data.productName} to ${data.toStore}`,
      html: emailBase(
        "#dc3545",
        "Transfer Rejected",
        `
          <p>Dear Source Store Manager,</p>
          <p>Your suggested transfer has been <strong>rejected</strong>.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td><strong>From Your Store:</strong></td><td>${data.fromStore}</td></tr>
            <tr><td><strong>To Store:</strong></td><td>${data.toStore}</td></tr>
            <tr><td><strong>Product:</strong></td><td>${data.productName}</td></tr>
            <tr><td><strong>Quantity:</strong></td><td>${data.quantity}</td></tr>
            <tr><td><strong>Rejected By:</strong></td><td>${data.rejectedBy}</td></tr>
            <tr><td><strong>Rejected At:</strong></td><td>${new Date().toLocaleString()}</td></tr>
          </table>
          <p style="margin-top: 15px;">You may review and resubmit this suggestion if needed.</p>
        `
      )
    },
    destination: {
      subject: `Proposed Incoming Transfer Rejected - ${data.productName} from ${data.fromStore}`,
      html: emailBase(
        "#dc3545",
        "Incoming Transfer Rejected",
        `
          <p>Dear Destination Store Manager,</p>
          <p>A proposed stock transfer to your store has been <strong>rejected</strong>.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td><strong>From Store:</strong></td><td>${data.fromStore}</td></tr>
            <tr><td><strong>To Your Store:</strong></td><td>${data.toStore}</td></tr>
            <tr><td><strong>Product:</strong></td><td>${data.productName}</td></tr>
            <tr><td><strong>Quantity:</strong></td><td>${data.quantity}</td></tr>
            <tr><td><strong>Rejected By:</strong></td><td>${data.rejectedBy}</td></tr>
            <tr><td><strong>Rejected At:</strong></td><td>${new Date().toLocaleString()}</td></tr>
          </table>
          <p style="margin-top: 15px;">No action is required from your side at this time.</p>
        `
      )
    }
  }),

  edit: (data) => ({
    source: {
      subject: `Transfer Updated - ${data.productName} to ${data.toStore}`,
      html: emailBase(
        "#007bff",
        "Transfer Details Updated",
        `
          <p>Dear Source Store Manager,</p>
          <p>Your suggested transfer has been <strong>updated</strong>.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td><strong>From Your Store:</strong></td><td>${data.fromStore}</td></tr>
            <tr><td><strong>To Store:</strong></td><td>${data.toStore}</td></tr>
            <tr><td><strong>Updated Quantity:</strong></td><td>${data.quantity}</td></tr>
            <tr><td><strong>Updated Reason:</strong></td><td>${data.reason}</td></tr>
            <tr><td><strong>Updated By:</strong></td><td>${data.updatedBy}</td></tr>
            <tr><td><strong>Updated At:</strong></td><td>${new Date().toLocaleString()}</td></tr>
          </table>
        `
      )
    },
    destination: {
      subject: `Incoming Transfer Updated - ${data.productName} from ${data.fromStore}`,
      html: emailBase(
        "#007bff",
        "Incoming Transfer Updated",
        `
          <p>Dear Destination Store Manager,</p>
          <p>Details of an incoming transfer have been <strong>updated</strong>.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td><strong>From Store:</strong></td><td>${data.fromStore}</td></tr>
            <tr><td><strong>To Your Store:</strong></td><td>${data.toStore}</td></tr>
            <tr><td><strong>Updated Quantity:</strong></td><td>${data.quantity}</td></tr>
            <tr><td><strong>Updated Reason:</strong></td><td>${data.reason}</td></tr>
            <tr><td><strong>Updated By:</strong></td><td>${data.updatedBy}</td></tr>
            <tr><td><strong>Updated At:</strong></td><td>${new Date().toLocaleString()}</td></tr>
          </table>
        `
      )
    }
  })
};



export const sendEmail = async (type, data) => {
    try {
        if (!transporter) throw new Error('Email transporter not configured');
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) throw new Error('Email credentials not configured');

        console.log('Testing email connection...');
        await transporter.verify();
        console.log('Email connection verified successfully');

        // Get the right template
        const template = emailTemplates[type](data);

        // Prepare emails for source and destination managers
        const sourceMailOptions = {
            from: process.env.EMAIL_USER,
            to: "u23cs005@coed.svnit.ac.in",
            subject: template.source.subject,
            html: template.source.html
        };

        const destinationMailOptions = {
            from: process.env.EMAIL_USER,
            to: "pvmehta112@gmail.com",
            subject: template.destination.subject,
            html: template.destination.html
        };

        // Send emails separately
        console.log('Sending source manager email...');
        const sourceResult = await transporter.sendMail(sourceMailOptions);

        console.log('Sending destination manager email...');
        const destinationResult = await transporter.sendMail(destinationMailOptions);

        console.log('Emails sent successfully:', {
            sourceMessageId: sourceResult.messageId,
            destinationMessageId: destinationResult.messageId
        });

        return { success: true, sourceMessageId: sourceResult.messageId, destinationMessageId: destinationResult.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
};


// Specific functions for different actions
export const sendApprovalEmail = async (suggestionData, approvedBy) => {
    return await sendEmail('approve', { ...suggestionData, approvedBy });
};

export const sendRejectionEmail = async (suggestionData, rejectedBy) => {
    return await sendEmail('reject', { ...suggestionData, rejectedBy });
};

export const sendEditEmail = async (suggestionData, updatedBy) => {
    return await sendEmail('edit', { ...suggestionData, updatedBy });
}; 