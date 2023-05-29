const express = require("express");
const router = express.Router();
const {
    googleAuth, authRedirect
} = require("../controllers/google");

router.get("/google", googleAuth);
router.get("/google/redirect", authRedirect);

module.exports = router;