const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000";

router.get("/google", passport.authenticate("google"));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: `${CLIENT_URL}/landing`,
        failureRedirect: "/login/failed",
    })
);

router.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect(CLIENT_URL);
});

router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "Login success",
            user: {
                id: req.user.id,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email,
                profilePicture: req.user.profilePicture,
                university: req.user.university,
                city: req.user.city,
                state: req.user.state,
                gender: req.user.gender,
                major: req.user.major,
                startDate: req.user.startDate,
                endDate: req.user.endDate,
                hobbies: req.user.hobbies,
            }
        });
    }
});

router.get("/user", (req, res) => {
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ error: "Not authorized" });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "Login failure",
    });
});

module.exports = router