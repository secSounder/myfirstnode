const http = require("http");//request - axios
const getphone = require("./kernel/getphone")
const savephone = require("./kernel/savephone")
const sendmail = require("./kernel/sendmail")
const spider = {
    url: "http://www.baidu.com/",
    //url: "http://m.10010.com/NumApp/NumberCenter/qryNum?callback=jsonp_queryMoreNums&provinceCode=11&cityCode=110&monthFeeLimit=0&groupKey=85236889&searchCategory=3&net=01&amounts=200&codeTypeCode=&searchValue=&qryType=02&goodsNet=4&_=1544256986564"
    undefinedjsonp_queryMoreNums(param) {
        return param;
    },
    reqphone(){
        let funcstr;
        var that = this;
        http.get(that.url, function (req) {
            //测试用数据
            var monidata = {
                "code": "M9",
                "numArray": [
                    15126221819, 0, 0, 0, 16816161234, 0, 0, 0, 16816161212, 0, 0, 0, 16816161122, 0, 0, 0, 16816165566, 0, 0, 0, 16816168989, 0, 0, 0, 16816160956, 0, 0, 0, 16816160956, 0, 0, 0, 16816160956,0,0,0
                ],
                "provinceShowHuiTag": "0",
                "splitLen": "12",
                "uuid": "06daa244-a911-4ac6-ab32-19625bbf4627"
            }
            req.on('data', function (data) {
                funcstr += data;
            })
            req.on('end', function () {
                funcstr = 'that.' + 'undefinedjsonp_queryMoreNums(monidata)'
                let query_res = eval(funcstr)
                //获取号码：
                let phone_res = getphone(query_res);
                //保存到本地,并去重
                let email_res = savephone(phone_res.allPhone, phone_res.luckyPhone);
                //发送邮件
                sendmail(email_res);
            })
        })
    },
    run: function () {
        var that = this;
        setInterval(function () {
           that.reqphone()
        }, (3000))
    }
}
spider.run();
module.exports = spider;
