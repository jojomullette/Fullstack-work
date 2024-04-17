const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 5173;

// Middleware to parse JSON body
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jmmj0123321@gmail.com',
        pass: 'Supernova3!'
    }
});

// API endpoint to send email
app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: 'jmmj0123321@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Sent' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ message: 'Email sent successfully' });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
