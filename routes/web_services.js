const express = require("express");
const router = express.Router();
require("dotenv").config;
const { validateApiKey } = require("../Utility/validateApiKey");

const {
  report,
  report_periode,
  cif_input,
  cif_ubah,
  cif_cari,
} = require("../controller/web_services");

router.post("/report", validateApiKey, report);
router.post("/report/periode", validateApiKey, report_periode);
router.post("/cif/input", validateApiKey, cif_input);
router.post("/cif/ubah", validateApiKey, cif_ubah);
router.post("/cif/cari", validateApiKey, cif_cari);

module.exports = router;
