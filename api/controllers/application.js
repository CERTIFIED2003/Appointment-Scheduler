const { google } = require("googleapis");
const axios = require("axios");
const User = require("../models/User.js");
const Meeting = require("../models/Meeting.js");
const { v4 } = require("uuid");
const mongoose = require("mongoose");

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

exports.apiCall = async (req, res) => {
    res.send({ message: 'Ok api is working 🚀' });
};

exports.auth = async (req, res) => {
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

exports.createToken = async (req, res) => {
    try {
        const code = req.query.code;
        if (!code) return res.redirect(`${process.env.FRONTEND_URL}`);

        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials({
            refresh_token: tokens.refresh_token
        });

        const googleUser = await axios
            .get(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${tokens.id_token}`,
                    },
                },
            )
            .then(res => {
                return { data: res.data, refresh_token: tokens.refresh_token };
            })
            .catch(error => {
                throw new Error(error.message);
            });
        const { id, email, name } = googleUser.data;
        let user = await User.findOneAndUpdate({ email }, {
            googleId: id,
            refresh_token: googleUser.refresh_token,
            name,
            email,
        },
            { upsert: true, new: true }
        );

        const userJson = JSON.stringify(user);
        const encodedUser = encodeURIComponent(userJson);
        res.redirect(`${process.env.FRONTEND_URL}?user=${encodedUser}`);
    }
    catch (error) {
        console.log(error);
    }
};

exports.createEvent = async (req, res) => {
    try {
        const {
            userId,
            summary,
            description,
            timezone,
            startTime,
            endTime,
            guests
        } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.send("User not found");

        const calendar = google.calendar({
            version: "v3",
            auth: process.env.API_KEY
        });

        const localStartTime = new Date(startTime).toLocaleTimeString();
        const localEndTime = new Date(endTime).toLocaleTimeString();
        const response = await calendar.events.insert({
            auth: oauth2Client,
            calendarId: "primary",
            conferenceDataVersion: 1,
            requestBody: {
                summary: `${summary} | Event Schedule: ${localStartTime} to ${localEndTime} (${timezone})`,
                description: description,
                start: {
                    dateTime: new Date(startTime).toISOString(),
                    timeZone: timezone,
                },
                end: {
                    dateTime: new Date(endTime).toISOString(),
                    timeZone: timezone,
                },
                conferenceData: {
                    createRequest: {
                        requestId: v4(),
                    },
                },
                attendees: guests,
            }
        });

        const meetingData = {
            _id: new mongoose.Types.ObjectId(),
            creatorId: userId,
            summary: summary,
            description: description,
            timeZone: timezone,
            start: new Date(startTime).toISOString(),
            end: new Date(endTime).toISOString(),
            organizer: {
                name: user.name,
                email: user.email,
            },
            attendees: guests
        };

        const filter = {
            "start": startTime,
            "end": endTime,
            organizer: {
                name: user.name,
                email: user.email,
            },
        };
        await Meeting.findOneAndUpdate(filter, meetingData, {
            upsert: true,
            new: true,
        });
        await User.findByIdAndUpdate(userId, {
            $addToSet: { meetings: meetingData._id },
        });

        res.status(200).send({ response });
    }
    catch (error) {
        console.log(error);
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const userId = req.params.userId;
        let user = await User.findById(userId);
        if (!user) return res.send("User not found");
        let meetingsData = [];

        const populateUser = await User.findById(userId).populate("meetings");
        meetingsData = populateUser.meetings.map((meeting) => ({
            timezone: meeting.timeZone,
            start: new Date(meeting.start).toISOString(),
            end: new Date(meeting.end).toISOString(),
            attendee: meeting.attendees,
        }));

        res.status(200).send({ meetingsData });
    }
    catch (error) {
        console.log(error);
    }
};