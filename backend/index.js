const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const app = express();

require("./config/passport");
require("dotenv").config();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users")

app.use(
    cookieSession({ name: "session", keys: ["lama"], maxAge: 3 * 24 * 60 * 60 * 1000 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,PATCH,DELETE",
        credentials: true,
    })
);

app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", userRoute);

const start = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => { console.error(err); });

    app.listen("5000", () => {
        console.log("Listening on port 5000...");
    });
};

start();