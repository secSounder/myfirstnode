var http = require("http");
var fs = require("fs")
var nodemailer = require("nodemailer")

function spider() {
    // var url = "http://www.baidu.com/"
    var url = "http://m.10010.com/NumApp/NumberCenter/qryNum?callback=jsonp_queryMoreNums&provinceCode=11&cityCode=110&monthFeeLimit=0&groupKey=85236889&searchCategory=3&net=01&amounts=200&codeTypeCode=&searchValue=&qryType=02&goodsNet=4&_=1544256986564"
    var funcstr;
    var res;
    var allPhone = [];
    var luckyPhone = [];
    var emailPhone = [];

    var transport = nodemailer.createTransport({
        host: "smtp.qq.com",
        secureConnection: true,
        port: 465,
        auth: {
            user: "849213379@qq.com",
            pass: "xjtupcmzatzubcce"
        }
    })



    http.get(url, function (req) {

        function undefinedjsonp_queryMoreNums(param) {
            return param;
        }
        //测试用数据
        /*  var monidata = {
             "code": "M9",
             "numArray": [
                 0, 0, 0, 15126221819, 0, 0, 0, 16816161234, 0, 0, 0, 16816161212, 0, 0, 0, 16816161122, 0, 0, 0, 16816165566, 0, 0, 0, 16816168989, 0, 0, 0, 16816160956, 0, 0, 0, 16816160956, 0, 0, 0, 16816160956
             ],
             "provinceShowHuiTag": "0",
             "splitLen": "12",
             "uuid": "06daa244-a911-4ac6-ab32-19625bbf4627"
         } */
        req.on('data', function (data) {
            funcstr += data;
        })
        req.on('end', function () {
            // funcstr = 'jsonp_queryMoreNums(monidata)'
            console.log(funcstr)
            res = eval(funcstr)
            //获取号码：
            getPhone();
            //保存到本地,并去重
            savePhone();
            //发送邮件
            sendmail();
        })
    })
    function getPhone() {
        for (let i = 0; 12 * i <= res.numArray.length; i++) {
            let phoneNum = res.numArray.slice(12 * i, 12 * i + 1).join(",")
            allPhone.push(phoneNum);
        }
        console.log("所有号码")
        console.log(allPhone)
        for (let i = 0; i <= allPhone.length; i++) {
            let phoneNum = allPhone[i];
            var pattern1;//模式1
            for (let num = 0; num < 9; num++) {
                var matchText = String(num) + String(num + 1) + String(num + 2) + + String(num + 3)
                var regstr = '/(' + matchText + ')$/'
                pattern1 = eval(regstr)
                if (pattern1.test(phoneNum)) {
                    luckyPhone.push(phoneNum)
                }
            }
            var pattern2;//模式2
            for (let num = 0; num < 9; num++) {
                var matchText = String(num) + String(num + 1)
                var regstr = '/(' + matchText + '){2,}$/'
                pattern2 = eval(regstr)
                if (pattern2.test(phoneNum)) {
                    luckyPhone.push(phoneNum)
                }
            }
            var pattern3;//模式3
            for (let num = 0; num < 9; num++) {
                for (let num1 = 0; num1 < 9; num1++) {
                    var matchText = String(num) + String(num) + String(num1) + String(num1);
                    var regstr = '/(' + matchText + ')$/'
                    pattern3 = eval(regstr)
                    if (pattern3.test(phoneNum)) {
                        luckyPhone.push(phoneNum)
                    }
                }
            }
        }
        console.log("幸运号码")
        console.log(luckyPhone)
    }
    function savePhone() {
        let alldata = fs.readFileSync("./allphone.json", { encoding: "utf-8" })
        let luckydata = fs.readFileSync("./luckyphone.json", { encoding: "utf-8" })
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
        fs.writeFile("./allphone.json", alldata, function (err) {
            if (err) {
                console.log(err)
            }
        })
        fs.writeFile("./luckyphone.json", luckydata, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }

    function sendmail() {
        console.log("=============")
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
}

module.exports = spider;

