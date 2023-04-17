require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User")
const UserController = require("../controllers")

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"]
        },
        async (accessToken, refreshToken, profile, done) => {
            const id = profile.id;
            const email = profile.emails[0].value;
            const firstName = profile.name.givenName;
            const lastName = profile.name.familyName;
            const profilePhoto = profile.photos[0].value;

            const existingUser = await UserController.getUserByEmail({
                email,
            });

            if (!existingUser) {
                const newUser = await UserController.addUser({
                    id,
                    email,
                    firstName,
                    lastName,
                    profilePhoto,
                });
                return done(null, newUser);
            }

            return done(null, existingUser);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const currentUser = await User.findOne({
        id,
    });
    done(null, currentUser);
});