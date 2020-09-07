const db = require('./oracledb');
const head = require('./head');
const detailed = require('./detailed');
const fs = require('fs');
const path=require("path");





function add_detailed(sql) {
    db.query(sql, function(res) {
        res.forEach(function(itme, index) {
            var arr = detailed.detailed(itme.PM_CODE, itme.ORDER_NO);
            let fd = fs.openSync('./detailed.sql', 'a');
            fs.open('./detailed.sql', 'a', function(err, fd) {
                if (err) {
                    console.log(err)
                } else {
                    fs.writeFile(fd, arr + '\n', (err) => {
                        if (err) {
                            console.log(err)
                        }

                        fs.close(fd, (err) => {
                            if (err) {
                                console.log(err)
                            }
                        })
                    });
                }
            });

        });
    });


    console.log('写入成功');
}



function add_head() {
    array.forEach(function(itme) {
        var arr = head.myheadsql(itme);
        let fd = fs.openSync('./head.sql', 'w');
        fs.open('./head.sql', 'a', function(err, fd) {
            if (err) {
                console.log(err)
            } else {
                fs.writeFile(fd, arr + '\n', (err) => {
                    if (err) throw err;
                    fs.close(fd, (err) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                });
            }
        });
    });

    console.log('写入成功');
}




function add() {
    fs.writeFile('./mytest/detailed.sql', '', function(err) { if (err) return err })
    array.forEach(function(itme) {
        var sql = "select a.pm_code,a.order_no from ef_ap_fee_header a where a.order_no in (\n" +
            "'" + itme + "'\n" +
            ") and  a.is_replace_settlement=1 and a.supplier_code_settlement='HC0066728'"

        add_detailed(sql)
    })
}




var array = fs.readFileSync(path.resolve(__dirname, './date.txt')).toString().split("\r\n");

console.log(array);