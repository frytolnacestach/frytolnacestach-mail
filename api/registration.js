const nodeMailer = require('nodemailer')

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {

    const html = `
        <h1> Hello mail - test 9</h1>
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

        const info = await transporter.sendMail({
            from: 'Registrace - Frytol na cestách <registrace@frytolnacestach.cz>',
            to: 'frytolnacestach@gmail.com',
            subject: 'Registrace - Frytol na cestách',
            html: html,
        })

        console.log("Message sent: " + info.messageId);
        console.log(info.accepted);
        console.log(info.rejected);
    }

    main()
    .catch(e => console.log(e))

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

        const info = await transporter.sendMail({
            from: 'Registrace - Frytol na cestách <registrace@frytolnacestach.cz>',
            to: 'frytolnacestach@gmail.com',
            subject: 'Registrace - Frytol na cestách',
            html: html,
        })

    }

    res.status(200).send("E-mail byl úspěšně odeslán.");

    main().catch(e => console.log(e))

});

module.exports = router;*/