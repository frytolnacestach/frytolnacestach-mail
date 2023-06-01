const nodeMailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

    const filePath = path.join(__dirname, '../templates/registration.html');
    
    try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        const html = fileData;

        function sendEmail(callback) {
            const transporter = nodeMailer.createTransport({
                host: 'smtp.forpsi.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'registrace@frytolnacestach.cz',
                    pass: process.env.EMAIL_REG_PASS
                }
            });

            const mailOptions = {
                from: 'Registrace - Frytol na cestách <registrace@frytolnacestach.cz>',
                to: 'frytolnacestach@gmail.com',
                subject: 'Registrace na cestovatelském portálu Frytol na cestách',
                html: html,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error sending email:", error);
                    callback(error);
                } else {
                    console.log("Message sent: " + info.messageId);
                    console.log(info.accepted);
                    console.log(info.rejected);
                    callback(null);
                }
            });
        }

        sendEmail((error) => {
            if (error) {
                res.status(500).send("Nepodařilo se odeslat e-mail.");
            } else {
                res.status(200).send("E-mail byl úspěšně odeslán.");
            }
        });
    } catch (error) {
        console.error("Chyba při čtení souboru:", error);
        res.status(500).send("Chyba při načítání e-mailového obsahu.");
    }

});

module.exports = router;