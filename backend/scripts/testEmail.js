require('dotenv').config();
const nodemailer = require('nodemailer');
const emailService = require('../services/emailService');

// Test data
const testContactData = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '123-456-7890',
  subject: 'Test Email Notification',
  message: 'This is a test message to verify that email notifications are working correctly.\n\nIf you received this email, your email configuration is set up properly!'
};

async function runTest() {
  console.log('Testing email notification service...');
  console.log(`Sending test email to: ${process.env.EMAIL_TO}`);
  
  try {
    const info = await emailService.sendContactNotification(testContactData);
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('❌ Failed to send email:');
    console.error(error);
    
    // Check common configuration issues
    if (!process.env.EMAIL_SERVICE || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('\nMissing email configuration in .env file. Please check your configuration.');
    }
    
    if (error.code === 'EAUTH') {
      console.error('\nAuthentication failed. Check your email and password.');
      console.error('If using Gmail, make sure you\'re using an App Password.');
    }
  }
}

runTest();
