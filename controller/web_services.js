const axios = require("axios").default;
const express = require("express");
require("dotenv").config;

const url_collme = process.env.URL_COLLME;
const api_key = process.env.API_KEY;
const url_core = process.env.CORE_URL;

const connect_axios = async (url, api, route, api_key, data) => {
  try {
    let Result = "";
    console.log(`${url}${route}`);
    console.log(`DATA API ${api} BANKING`);
    console.log(data);
    let headers;
    if (api === "CMS") {
      headers = {
        "Content-Type": "application/json",
        "api-key": api_key,
      };
    } else if (api === "CORE") {
      headers = {
        "Content-Type": "application/json",
      };
    }
    await axios({
      headers,
      method: "post",
      url: `${url}${route.toLowerCase()}`,
      timeout: 25000, //milisecond
      data,
    })
      .then((res) => {
        Result = res.data;
      })
      .catch((error) => {
        console.log(`error ${api}`);
        // console.log(error);
        if (error.code == "ECONNABORTED") {
          Result = {
            code: "088",
            status: "ECONNABORTED",
            message: `${api} Connection Timeout`,
          };
        } else {
          Result = {
            code: "099",
            status: "CONNECTION FAILED",
            message: error,
          };
        }
      });
    console.log(Result);
    return Result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const report = async (req, res) => {
  let { nohp, report_type } = req.body;
  try {
    const data_report = { nohp, report_type };
    let request_report = await connect_axios(
      url_collme,
      "CMS",
      "collme/cis/report",
      api_key,
      data_report
    );
    if (request_report.code !== "000" && request_report.data === null) {
      console.log(request_report);
      res.status(200).send(request_report);
    } else {
      let res_send = {
        code: "000",
        status: "ok",
        message: "Success",
        data: request_report.data,
      };
      console.log(res_send);
      res.status(200).send(res_send);
    }
  } catch (error) {
    //--error server--//
    console.log("erro get product", error);
    res.send(error);
  }
};

const report_periode = async (req, res) => {
  let { nohp, tgl_awal, tgl_akhir } = req.body;
  try {
    const data_report = { nohp, tgl_awal, tgl_akhir };
    let request_report = await connect_axios(
      url_collme,
      "CMS",
      "collme/cis/report/periode",
      api_key,
      data_report
    );
    if (request_report.code !== "000" && request_report.data === null) {
      console.log(request_report);
      res.status(200).send(request_report);
    } else {
      let res_send = {
        code: "000",
        status: "ok",
        message: "Success",
        data: request_report.data,
      };
      console.log(res_send);
      res.status(200).send(res_send);
    }
  } catch (error) {
    //--error server--//
    console.log("erro get product", error);
    res.send(error);
  }
};

const cif_input = async (req, res) => {
  try {
    const data_report = req.body;
    let request_report = await connect_axios(
      url_collme,
      "CORE",
      "cif/input",
      api_key,
      data_report
    );
    if (request_report.code !== "000" && request_report.data === null) {
      console.log(request_report);
      res.status(200).send(request_report);
    } else {
      let res_send = {
        code: "000",
        status: "ok",
        message: "Success",
        data: request_report.data,
      };
      console.log(res_send);
      res.status(200).send(res_send);
    }
  } catch (error) {
    //--error server--//
    console.log("erro get product", error);
    res.send(error);
  }
};

const cif_ubah = async (req, res) => {
  try {
    const data_report = req.body;
    let request_report = await connect_axios(
      url_collme,
      "CORE",
      "cif/ubah",
      api_key,
      data_report
    );
    if (request_report.code !== "000" && request_report.data === null) {
      console.log(request_report);
      res.status(200).send(request_report);
    } else {
      let res_send = {
        code: "000",
        status: "ok",
        message: "Success",
        data: request_report.data,
      };
      console.log(res_send);
      res.status(200).send(res_send);
    }
  } catch (error) {
    //--error server--//
    console.log("erro get product", error);
    res.send(error);
  }
};

const cif_cari = async (req, res) => {
  try {
    const data_report = req.body;
    let request_report = await connect_axios(
      url_collme,
      "CORE",
      "cif/search",
      api_key,
      data_report
    );
    if (request_report.code !== "000" && request_report.data === null) {
      console.log(request_report);
      res.status(200).send(request_report);
    } else {
      let res_send = {
        code: "000",
        status: "ok",
        message: "Success",
        data: request_report.data,
      };
      console.log(res_send);
      res.status(200).send(res_send);
    }
  } catch (error) {
    //--error server--//
    console.log("erro get product", error);
    res.send(error);
  }
};

module.exports = { report, report_periode, cif_input, cif_ubah, cif_cari };
