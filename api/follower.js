const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {

    const filePath = path.join(__dirname, '../templates/sledovani.html');
    
    try {
        const email = req.body.email;
        const userSlug = req.body.user_slug;
        const userNickname = req.body.user_nickname;
        const fileData = fs.readFileSync(filePath, 'utf8');
        const compiledTemplate = ejs.compile(fileData);

        // Načtěte obsah jednotlivých částí e-mailu
        const blockBaseHeader = fs.readFileSync(path.join(__dirname, '../templates/block-base/header.html'), 'utf8');
        const blockContentFollower = fs.readFileSync(path.join(__dirname, '../templates/block-content/follower.html'), 'utf8');
        const blockBaseFooter = fs.readFileSync(path.join(__dirname, '../templates/block-base/footer.html'), 'utf8');

        // Spojujeme obsah jednotlivých částí do kompletního e-mailu
        const completeHtml = compiledTemplate({
            email,
            userSlug,
            userNickname,
            blockBaseHeader,
            blockContentFollower,
            blockBaseFooter
        });

        function sendEmail(callback) {
            const transporter = nodeMailer.createTransport({
                host: 'smtp.forpsi.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'notification@frytolnacestach.cz',
                    pass: process.env.EMAIL_NOT_PASS
                }
            });

            const mailOptions = {
                from: 'Notifikace - Frytol na cestách <notification@frytolnacestach.cz>',
                to: email,
                subject: 'Někdo tě začal sledovat na cestovatelském portálu Frytol na cestách',
                headers: {
                    'X-Mailer': 'Frytol na cestách',
                    'X-Icon': 'https://mail.frytolnacestach.cz/public/img/favicons/android-chrome-192x192.png'
                },
                html: completeHtml,
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