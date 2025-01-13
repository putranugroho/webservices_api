const express = require('express');
const router = express.Router();
require('dotenv').config;
const { validateApiKey } = require('../../../utils/validateApiKey');

const url_core = process.env.CORE_URL
const url_cms = process.env.CMS_URL

const connect_axios = async (url, api, route, data) => {
    try {
        let Result = ""
        console.log(`${url}${route}`);
        console.log(`DATA API ${api} BANKING`);
        console.log(data);
        let headers
        if (api === 'CMS') {
            headers = {
                "Content-Type": "application/json",
                "api-key": process.env.API_KEY
            }
        } else if (api === 'CORE') {
            headers = {
                "Content-Type": "application/json",
            }
        }
        await axios({
            headers,
            method: 'post',
            url: `${url}${route.toLowerCase()}`,
            timeout: 25000, //milisecond
            data
        }).then(res => {
            Result = res.data
        }).catch(error => {
            console.log(`error ${api}`);
            // console.log(error);
            if (error.code == 'ECONNABORTED') {
                Result = {
                    code: "088",
                    status: "ECONNABORTED",
                    message: `${api} Connection Timeout`
                }
            } else {
                Result = {
                    code: "099",
                    status: "CONNECTION FAILED",
                    message: error
                }
            }
        });
        console.log(Result);
        return Result
    } catch (error) {
        console.log(error);
        return error
    }
}


router.post('/report', validateApiKey, async (req, res) => {
    let {nohp, report_type} = req.body;
    try {
        const data_report = {nohp, report_type}
        let request_report = await connect_axios(url_cms, 'CMS', 'collme/cis/report', data_report)
        if (request_report.code !== "000" && request_report.data === null) {
            console.log(request_report);
            res.status(200).send(request_report);
        } else {
            let res_send = {
                code: "000",
                status: "ok",
                message: "Success",
                data: request.data,
            }
            console.log(res_send);
            res.status(200).send(res_send);
        }
    } catch (error) {
        //--error server--//
        console.log("erro get product", error);
        res.send(error);
    }
});


router.post('/report/periode', validateApiKey, async (req, res) => {
    let {nohp, tgl_awal, tgl_akhir} = req.body;
    try {
        const data_report = {nohp, tgl_awal, tgl_akhir}
        let request_report = await connect_axios(url_cms, 'CMS', 'collme/cis/report/periode', data_report)
        if (request_report.code !== "000" && request_report.data === null) {
            console.log(request_report);
            res.status(200).send(request_report);
        } else {
            let res_send = {
                code: "000",
                status: "ok",
                message: "Success",
                data: request.data,
            }
            console.log(res_send);
            res.status(200).send(res_send);
        }
    } catch (error) {
        //--error server--//
        console.log("erro get product", error);
        res.send(error);
    }
});

module.exports = router