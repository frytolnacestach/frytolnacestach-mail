const nodeMailer = require('nodemailer')
const path = require('path')
const express = require("express")
const router = express.Router()

router.post("/", (req, res) => {
    try {
        const from = req.body.from
        const to = req.body.to
        const subject = req.body.subject
        const message = req.body.message

        function sendEmail(callback) {
            const transporter = nodeMailer.createTransport({
                host: 'smtp.forpsi.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'registrace@frytolnacestach.cz',
                    pass: process.env.EMAIL_REG_PASS
                }
            })

            const mailOptions = {
                from: 'Test - Frytol na cestách <registrace@frytolnacestach.cz>',
                to: to,
                subject: subject,
                headers: {
                    'X-Mailer': 'Frytol na cestách',
                    'X-Image-Url': 'https://mail.frytolnacestach.cz/public/img/email/profile/frytolnacestach.png'
                },
                html: message,
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error sending email:", error)
                    callback(error)
                } else {
                    console.log("Message sent: " + info.messageId)
                    console.log(info.accepted)
                    console.log(info.rejected)
                    callback(null)
                }
            })
        }

        sendEmail((error) => {
            if (error) {
                res.status(500).send("Nepodařilo se odeslat e-mail.")
            } else {
                res.status(200).send("E-mail byl úspěšně odeslán.")
            }
        })
    } catch (error) {
        console.error("Chyba při čtení souboru:", error)
        res.status(500).send("Chyba při načítání e-mailového obsahu.")
    }
})

module.exports = router
/*
const nodeMailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const express = require("express")
const router = express.Router()

router.post("/", (req, res) => {    
    try {
        const from = req.body.from
        const to = req.body.to
        const subject = req.body.subject
        const message = req.body.message

        function sendEmail(callback) {
            const transporter = nodeMailer.createTransport({
                host: 'smtp.forpsi.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'registrace@frytolnacestach.cz',
                    pass: process.env.EMAIL_REG_PASS
                }
            })

            const mailOptions = {
                from: from,
                to: to,
                subject: subject,
                headers: {
                    'X-Mailer': 'Frytol na cestách',
                    'X-Image-Url': 'https://mail.frytolnacestach.cz/public/img/email/profile/frytolnacestach.png'
                },
                html: message,
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error sending email:", error)
                    callback(error)
                } else {
                    console.log("Message sent: " + info.messageId)
                    console.log(info.accepted)
                    console.log(info.rejected)
                    callback(null)
                }
            })
        }

        sendEmail((error) => {
            if (error) {
                res.status(500).send("Nepodařilo se odeslat e-mail.")
            } else {
                res.status(200).send("E-mail byl úspěšně odeslán.")
            }
        })
    } catch (error) {
        console.error("Chyba při čtení souboru:", error)
        res.status(500).send("Chyba při načítání e-mailového obsahu.")
    }
})

module.exports = router*/