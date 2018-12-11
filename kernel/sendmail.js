const nodemailer = require("nodemailer")

function sendmail(emailPhone) {
    var transport = nodemailer.createTransport({
        host: "smtp.qq.com",
        secureConnection: true,
        port: 465,
        auth: {
            user: "849213379@qq.com",
            pass: "xjtupcmzatzubcce"
        }
    })
    var mailOptions = {
        from: "xiaozhang 849213379@qq.com",
        to: "zhqian8488@126.com",
        subject: "本期中奖号码",
        text: "jidawei",
        html: "<b>" + emailPhone + "</b>",
        attachments: [],
    }
    if (emailPhone.length > 0) {
        transport.sendMail(mailOptions, function (err, response) {
            if (err) console.log(err)
            else console.log(response)
        })
    }
}
module.exports = sendmail;