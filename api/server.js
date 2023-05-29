const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

// Routes
readdirSync("./routes").map((r) => app.use("/", require('./routes/' + r)));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});

// Send Status at "/"
app.get("/", (req, res) => {
    res.status(200)
    .send({ status: "All systems working properly!", message: "Hello world from Appointment Scheduler!" });
});