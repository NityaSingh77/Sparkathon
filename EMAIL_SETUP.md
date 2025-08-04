# Email Notification Setup

This document explains how to set up email notifications for the Supply Chain Management System.

## Features Implemented

1. **Email Notifications**: When users approve, reject, or edit transfer suggestions, emails are automatically sent to `u23cs080@coed.svnit.ac.in`
2. **Notification Display**: All actions also display notifications in the UI notification tab
3. **Email Templates**: Professional HTML email templates for each action type

## Setup Instructions

### 1. Backend Setup

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Configure Email Credentials**:
   - Create a `.env` file in the `backend` directory
   - Add the following variables:
   ```env
   EMAIL_USER=divyanshvijay92@gmail.com
   EMAIL_PASS=your_app_password_here
   ```

3. **Gmail App Password Setup**:
   - Go to your Google Account settings
   - Enable 2-factor authentication
   - Generate an App Password for "Mail"
   - Use this App Password as `EMAIL_PASS` in your `.env` file

### 2. Frontend Setup

The frontend is already configured to work with the email functionality. No additional setup required.

## How It Works

### Email Triggers

1. **Approve Action**: When a user clicks "Approve" on a transfer suggestion
   - Sends approval email to `u23cs080@coed.svnit.ac.in`
   - Displays notification in UI
   - Email includes transfer details, approved by, and timestamp

2. **Reject Action**: When a user clicks "Reject" on a transfer suggestion
   - Sends rejection email to `u23cs080@coed.svnit.ac.in`
   - Displays notification in UI
   - Email includes transfer details, rejected by, and timestamp

3. **Edit Action**: When a user edits and saves transfer details
   - Sends edit notification email to `u23cs080@coed.svnit.ac.in`
   - Displays notification in UI
   - Email includes updated transfer details, updated by, and timestamp

### Email Content

Each email includes:
- Action type (Approve/Reject/Edit)
- Transfer details (from store, to store, product, quantity, reason)
- Estimated savings
- User who performed the action
- Timestamp
- Professional HTML formatting

### API Endpoints

- `POST /api/email/approve` - Send approval emails
- `POST /api/email/reject` - Send rejection emails  
- `POST /api/email/edit` - Send edit notification emails

## Testing

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend:
   ```bash
   npm run dev
   ```

3. Navigate to the Transfer Suggestions page
4. Try approving, rejecting, or editing a transfer suggestion
5. Check the notification tab for UI notifications
6. Check the email inbox of `u23cs080@coed.svnit.ac.in` for email notifications

## Troubleshooting

### Email Not Sending
- Verify your Gmail credentials in `.env`
- Ensure 2-factor authentication is enabled
- Check that the App Password is correct
- Check backend console for error messages

### Frontend Errors
- Ensure backend server is running on port 5000
- Check browser console for network errors
- Verify CORS settings in backend

### Notification Issues
- Check that NotificationContext is properly wrapped around the app
- Verify notification types are correct ('approve', 'reject', 'info', 'warning')

## Security Notes

- Never commit your `.env` file to version control
- Use App Passwords instead of your main Gmail password
- Consider using environment-specific email addresses for testing
- Implement rate limiting for email endpoints in production 