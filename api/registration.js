const nodeMailer = require('nodemailer');
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

    const html = `
        <h1>Vaše registrace byla úspěšná</h1>
        <p>Děkujeme vám za registraci na cestovatelském portálu Frytol na cestách. 
        Doufáme, že zde najdete všechny potřebné informace pro vaši další cestu a že nás budete doporučovat dál.</p>
    `;

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
            subject: 'Registrace - Frytol na cestách',
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

});

module.exports = router;