const router = require('express').Router();
const {
  apiCall, auth, createToken, createEvent
} = require("../controllers/application.js");

router.get('/', apiCall);
router.get("/auth", auth);
router.get("/create-token", createToken);
router.post("/create-event", createEvent);

module.exports = router;