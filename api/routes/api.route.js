const router = require('express').Router();
const {
  apiCall, auth, createToken
} = require("../controllers/application.js");

router.get('/', apiCall);
router.get("/auth", auth);
router.get("/create-token", createToken);

module.exports = router;