const fs = require("fs")

function savePhone(allPhone,luckyPhone) {
    let emailPhone = [];
    let alldata = fs.readFileSync("./json/allphone.json", { encoding: "utf-8" })
    let luckydata = fs.readFileSync("./json/luckyphone.json", { encoding: "utf-8" })
    if (alldata == "") {
        alldata = []
    } else {
        alldata = alldata.split(',')
    }
    if (luckydata == "") {
        luckydata = []
    } else {
        luckydata = luckydata.split(',')
    }
    //去重
    for (j = 0; j < allPhone.length; j++) {
        let idx = alldata.indexOf(allPhone[j])
        if (idx === -1) {
            alldata.push(allPhone[j])
        }
    }
    console.log("本地缓存的所有号码：")
    console.log(alldata)
    for (j = 0; j < luckyPhone.length; j++) {
        let idx = luckydata.indexOf(luckyPhone[j])
        if (idx === -1) {
            luckydata.push(luckyPhone[j])
            emailPhone.push(luckyPhone[j])
        }
    }
    console.log("本地缓存的幸运号码：")
    console.log(luckydata)
    console.log("通过邮件发送的号码：")
    console.log(emailPhone)
    //保存
    fs.writeFile("./json/allphone.json", alldata, function (err) {
        if (err) {
            console.log(err)
        }
    })
    fs.writeFile("./json/luckyphone.json", luckydata, function (err) {
        if (err) {
            console.log(err)
        }
    })
    return emailPhone;
}
module.exports = savePhone;