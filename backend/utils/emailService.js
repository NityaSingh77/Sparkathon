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

// Email templates
const emailTemplates = {
    approve: (data) => ({
        subject: "Transfer Suggestion Approved",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #28a745;">Transfer Suggestion Approved</h2>
                <p><strong>From Store:</strong> ${data.fromStore}</p>
                <p><strong>To Store:</strong> ${data.toStore}</p>
                <p><strong>Product:</strong> ${data.productName}</p>
                <p><strong>Quantity:</strong> ${data.quantity}</p>
                <p><strong>Estimated Savings:</strong> $${data.estimatedSavings}</p>
                <p><strong>Approved by:</strong> ${data.approvedBy}</p>
                <p><strong>Approved at:</strong> ${new Date().toLocaleString()}</p>
                <hr>
                <p style="color: #666; font-size: 12px;">This is an automated notification from the Supply Chain Management System.</p>
            </div>
        `
    }),
    
    reject: (data) => ({
        subject: "Transfer Suggestion Rejected",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #dc3545;">Transfer Suggestion Rejected</h2>
                <p><strong>From Store:</strong> ${data.fromStore}</p>
                <p><strong>To Store:</strong> ${data.toStore}</p>
                <p><strong>Product:</strong> ${data.productName}</p>
                <p><strong>Quantity:</strong> ${data.quantity}</p>
                <p><strong>Rejected by:</strong> ${data.rejectedBy}</p>
                <p><strong>Rejected at:</strong> ${new Date().toLocaleString()}</p>
                <hr>
                <p style="color: #666; font-size: 12px;">This is an automated notification from the Supply Chain Management System.</p>
            </div>
        `
    }),
    
    edit: (data) => ({
        subject: "Transfer Suggestion Details Updated",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #007bff;">Transfer Suggestion Details Updated</h2>
                <p><strong>From Store:</strong> ${data.fromStore}</p>
                <p><strong>To Store:</strong> ${data.toStore}</p>
                <p><strong>Product:</strong> ${data.productName}</p>
                <p><strong>Updated Quantity:</strong> ${data.quantity}</p>
                <p><strong>Updated Reason:</strong> ${data.reason}</p>
                <p><strong>Updated by:</strong> ${data.updatedBy}</p>
                <p><strong>Updated at:</strong> ${new Date().toLocaleString()}</p>
                <hr>
                <p style="color: #666; font-size: 12px;">This is an automated notification from the Supply Chain Management System.</p>
            </div>
        `
    })
};

// Send email function
export const sendEmail = async (type, data) => {
    try {
        // Verify transporter is configured
        if (!transporter) {
            throw new Error('Email transporter not configured');
        }

        // Verify environment variables
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error('Email credentials not configured. Please check EMAIL_USER and EMAIL_PASS in .env file');
        }

        // Test the connection first
        console.log('Testing email connection...');
        await transporter.verify();
        console.log('Email connection verified successfully');

        const template = emailTemplates[type](data);
        
        const mailOptions = {
            from: process.env.EMAIL_USER, // divyanshvijay92@gmail.com
            to: "u23cs080@coed.svnit.ac.in",
            subject: template.subject,
            html: template.html
        };

        console.log('Attempting to send email...');
        console.log('From:', process.env.EMAIL_USER);
        console.log('To: u23cs080@coed.svnit.ac.in');
        console.log('Subject:', template.subject);

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result.messageId);
        return { success: true, messageId: result.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        console.error('Error details:', {
            code: error.code,
            command: error.command,
            response: error.response,
            responseCode: error.responseCode
        });
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