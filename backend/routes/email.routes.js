import express from 'express';
import { sendApprovalEmail, sendRejectionEmail, sendEditEmail } from '../utils/emailService.js';

const router = express.Router();

// Route for sending approval email
router.post('/approve', async (req, res) => {
    try {
        const { suggestionData, approvedBy } = req.body;
        
        if (!suggestionData || !approvedBy) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing required fields: suggestionData and approvedBy' 
            });
        }

        const result = await sendApprovalEmail(suggestionData, approvedBy);
        
        if (result.success) {
            res.json({ 
                success: true, 
                message: 'Approval email sent successfully',
                messageId: result.messageId 
            });
        } else {
            res.status(500).json({ 
                success: false, 
                message: 'Failed to send approval email',
                error: result.error 
            });
        }
    } catch (error) {
        console.error('Error in approval email route:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error',
            error: error.message 
        });
    }
});

// Route for sending rejection email
router.post('/reject', async (req, res) => {
    try {
        const { suggestionData, rejectedBy } = req.body;
        
        if (!suggestionData || !rejectedBy) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing required fields: suggestionData and rejectedBy' 
            });
        }

        const result = await sendRejectionEmail(suggestionData, rejectedBy);
        
        if (result.success) {
            res.json({ 
                success: true, 
                message: 'Rejection email sent successfully',
                messageId: result.messageId 
            });
        } else {
            res.status(500).json({ 
                success: false, 
                message: 'Failed to send rejection email',
                error: result.error 
            });
        }
    } catch (error) {
        console.error('Error in rejection email route:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error',
            error: error.message 
        });
    }
});

// Route for sending edit notification email
router.post('/edit', async (req, res) => {
    try {
        const { suggestionData, updatedBy } = req.body;
        
        if (!suggestionData || !updatedBy) {
            return res.status(400).json({ 
                success: false, 
                message: 'Missing required fields: suggestionData and updatedBy' 
            });
        }

        const result = await sendEditEmail(suggestionData, updatedBy);
        
        if (result.success) {
            res.json({ 
                success: true, 
                message: 'Edit notification email sent successfully',
                messageId: result.messageId 
            });
        } else {
            res.status(500).json({ 
                success: false, 
                message: 'Failed to send edit notification email',
                error: result.error 
            });
        }
    } catch (error) {
        console.error('Error in edit email route:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error',
            error: error.message 
        });
    }
});

export default router; 