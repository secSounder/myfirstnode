
function getPhone(res) {
    let phones = {
        "allPhone": [],
        "luckyPhone": [],
    }
    /* for (let i = 0; 4 * i <= res.numArray.length; i++) {
        // let phoneNum = res.numArray.slice(res.splitLen * i, res.splitLen * i + 1).join(",")
        let phoneNum = res.numArray.slice(4 * i, 4 * i + 1).join(",")
        phones.allPhone.push(phoneNum);
    } */
    res.numArray.filter(function(phoneNum){
        if(phoneNum!=0){
            phones.allPhone.push(phoneNum);
        }
    })
    console.log("所有号码")
    console.log(phones.allPhone)
    for (let i = 0; i <= phones.allPhone.length; i++) {
        let phoneNum = phones.allPhone[i];
        var pattern1;//模式1
        for (let num = 0; num < 9; num++) {
            var matchText = String(num) + String(num + 1) + String(num + 2) + + String(num + 3)
            var regstr = new RegExp('(' + matchText + ')$')
            console.log(regstr)
            var regstr = '/(' + matchText + ')$/'
            console.log(regstr)

            // pattern1 = eval(regstr)
            if (regstr.test(phoneNum)) {
                phones.luckyPhone.push(phoneNum)
            }
        }
        var pattern2;//模式2
        for (let num = 0; num < 9; num++) {
            var matchText = String(num) + String(num + 1)
            var regstr = '/(' + matchText + '){2,}$/'
            pattern2 = eval(regstr)
            if (pattern2.test(phoneNum)) {
                phones.luckyPhone.push(phoneNum)
            }
        }
        var pattern3;//模式3
        for (let num = 0; num < 9; num++) {
            for (let num1 = 0; num1 < 9; num1++) {
                var matchText = String(num) + String(num) + String(num1) + String(num1);
                var regstr = '/(' + matchText + ')$/'
                pattern3 = eval(regstr)
                if (pattern3.test(phoneNum)) {
                    phones.luckyPhone.push(phoneNum)
                }
            }
        }
    }
    console.log("幸运号码")
    console.log(phones.luckyPhone)
    return phones;
};
module.exports = getPhone;