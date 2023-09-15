const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nicolas.dupont59176@gmail.com',
        pass: 'mdwtnpjnuynkivxj',
    },
});

module.exports = transporter;
