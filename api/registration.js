const nodeMailer = require('nodemailer');
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

    const html = `
        <h1> Hello mail - test 12</h1>
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



/*
const nodeMailer = require('nodemailer')

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {

    const html = `
        <h1> Hello mail - test 8</h1>
    `;

    async function main() {
        const transporter = nodeMailer.createTransport({
            host: 'smtp.forpsi.com',
            port: 465,
            secure: true,
            auth: {
                user: 'registrace@frytolnacestach.cz',
                pass: process.env.EMAIL_REG_PASS
            }
        });

        try {
            const info = await transporter.sendMail({
                from: 'Registrace - Frytol na cestách <registrace@frytolnacestach.cz>',
                to: 'frytolnacestach@gmail.com',
                subject: 'Registrace - Frytol na cestách',
                html: html,
            })

            res.status(200).send("E-mail byl úspěšně odeslán.");
        } catch (e) {
            res.status(500).send("Chyba při odesílání e-mailu.");
        }

    }

    main().catch(e => console.log(e))

});

module.exports = router;*/