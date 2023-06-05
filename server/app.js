const sgMail = require('@sendgrid/mail');
require('dotenv').config();

async function sendEmail() {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: 'rishabhmaurya7654@gmail.com',
      from: 'shubhammaurya996633@gmail.com',
      subject: 'Sending with Twilio SendGrid is Fun',
      text: `Dear subscriber,

Thank you for joining our newsletter! We are excited to share valuable information and updates with you.

In this month's edition:
- Discover our latest product releases
- Learn about upcoming events and webinars
- Get exclusive offers and discounts

Stay tuned for more exciting updates! If you have any questions or feedback, feel free to reach out to us at any time.

Best regards,
Your Newsletter Team`,
      html: `<p>Dear subscriber,</p>
      <p>Thank you for joining our newsletter! We are excited to share valuable information and updates with you.</p>
      <p>In this month's edition:</p>
      <ul>
        <li>Discover our latest product releases</li>
        <li>Learn about upcoming events and webinars</li>
        <li>Get exclusive offers and discounts</li>
      </ul>
      <p>Stay tuned for more exciting updates! If you have any questions or feedback, feel free to reach out to us at any time.</p>
      <p>Best regards,<br>Your Newsletter Team</p>`,
      trackingSettings: {
        clickTracking: { enable: true },
        openTracking: { enable: true },
      },
    };

    await sgMail.send(msg);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
}

sendEmail();
