const router = require('express').Router();
const {
  apiCall, auth, createToken, createEvent, getAllEvents
} = require("../controllers/application.js");

router.get('/', apiCall);
router.get("/auth", auth);
router.get("/create-token", createToken);
router.post("/create-event", createEvent);
router.get("/all-events/:userId", getAllEvents);

module.exports = router;