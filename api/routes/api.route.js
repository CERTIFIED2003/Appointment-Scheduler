const router = require('express').Router();
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.get("/auth", async (req, res, next) => {
  try {
    const scopes = [
      'profile',
      'email',
      'https://www.googleapis.com/auth/calendar'
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: scopes
    });
    
    res.status(200).redirect(url);
  } catch (error) {
    next(error);
  }
});

router.get("/create-token", async (req, res, next) => {
  try {
    const code = req.query.code;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials({
      refresh_token: tokens.refresh_token
    });

    res.redirect(process.env.FRONTEND_URL);
  }
  catch (error) {
    next(error);
  }
})

module.exports = router;
