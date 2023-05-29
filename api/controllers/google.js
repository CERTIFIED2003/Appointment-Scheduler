const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

exports.googleAuth = async (req, res) => {
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
    }
    catch (error) {
        console.log(error);
    }
};

exports.authRedirect = async (req, res) => {
    try {
        const code = req.query.code;
        const { tokens } = await oauth2Client.getToken(code);
        console.log(tokens);
        oauth2Client.setCredentials({
            refresh_token: tokens.refresh_token
        });

        res.status(200).send({ message: "Sign in successfull!" });
    }
    catch (error) {
        console.log(error);
    }
};
