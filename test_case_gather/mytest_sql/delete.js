const db = require('./oracledb');
const fs=require('fs')


class Deletesql {

    constructor(date){
        this.data = date;
    }

    apheader(date){

        var sql= "delete from bms.EF_AP_HEADER aa where aa.ap_no in(\n" +
            "SELECT ab.cost_no FROM BMS.ef_ap_fee_detail ab where ab.head_pm_code in(\n" +
            "select ac.pm_code from BMS.ef_ap_fee_header ac where ac.order_no in(\n" +
            "'" + date + "'\n" +
            ") and ac.supplier_code_settlement='HC0060881'\n" +
            ") )\n";

        db.query(sql,function (res) {
           console.log('删除成功')
        })




    }

    apdetail(date){

        var sql= "delete from  bms.EF_AP_DETAIL aa where aa.ap_detail_no in(\n" +
            "SELECT ab.ap_detail_no FROM BMS.ef_ap_fee_detail ab where ab.head_pm_code in(\n" +
            "select ac.pm_code from BMS.ef_ap_fee_header ac where ac.order_no in(\n" +
            "'" + date + "'\n" +
            ") and ac.supplier_code_settlement='HC0060881'\n" +
            ") )\n";



        db.query(sql,function (res) {
            console.log('删除成功')
        })






    }

    arheader(date){

        var sql= "delete from bms.ef_ar_header cc where cc.ar_no in(\n" +
            "SELECT aa.income_no FROM BMS.ef_ar_fee_detail aa where aa.head_pm_code in(\n" +
            "SELECT bb.pm_code FROM BMS.ef_ar_fee_header bb where bb.order_no in(\n" +
            "'" + date + "'\n" +
            ")and bb.create_time<=to_date('2020-07-13','yyyy-mm-dd')))";

        db.query(sql,function (res) {
            console.log('删除成功')
        })



    }

    ardetail(date){

        var sql= "delete from bms.ef_ar_detail  cc where cc.ar_detail_no in(\n" +
            "SELECT aa.ar_detail_no FROM BMS.ef_ar_fee_detail aa where aa.head_pm_code in(\n" +
            "SELECT bb.pm_code FROM BMS.ef_ar_fee_header bb where bb.order_no in(\n" +
            "'" + date + "'\n" +
            ")and bb.create_time<=to_date('2020-07-13','yyyy-mm-dd'))\n" +
            ")\n";

        db.query(sql,function (res) {
            console.log('删除成功')
        })




    }


    apfee_detail(date){   //应付计费明细

        var sql="delete from BMS.ef_ap_fee_detail  aa  where aa.head_pm_code in(\n" +
            "select a.pm_code from  BMS.ef_ap_fee_header a where a.order_no in(\n" +
            " '"+date+"'\n" +
            ") and a.create_time<=to_date('2020-07-13','yyyy-mm-dd'))"

        db.query(sql,function (res) {
            console.log('删除成功')
        })




    }


    apfee_header(date){    //应付计费表头

        var sql="delete from  BMS.ef_ap_fee_header a where a.order_no in(\n" +
            "'"+date+"'\n" +
            ") and a.create_time<=to_date('2020-07-13','yyyy-mm-dd')"

        db.query(sql,function (res) {
            console.log('删除成功')
        })

    }

    arfee_detail(date){    //应收计费明细

        var sql="delete from  BMS.ef_ar_fee_detail  aa  where aa.head_pm_code in(\n" +
            "select a.pm_code from  BMS.ef_ar_fee_header  a where a.order_no in(\n" +
            "'"+date+"'\n" +
            ") and a.create_time<=to_date('2020-07-13','yyyy-mm-dd'))"

        db.query(sql,function (res) {
            console.log('删除成功')
        })

    }



    arfee_header(date){  //应收计费表头

        var sql="delete  from  BMS.ef_ar_fee_header  a where a.order_no in(\n" +
            "'"+date+"'\n" +
            ") and a.create_time<=to_date('2020-07-13','yyyy-mm-dd')"


        db.query(sql,function (res) {
            console.log('删除成功')
        })



    }


}







var deletesql=new Deletesql()





module.exports=deletesql

