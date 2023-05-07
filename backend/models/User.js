const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    profilePhoto: { type: String, required: false },
    university: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    gender: { type: String, required: false },
    major: { type: String, required: false },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
});

const userModel = mongoose.model("User", UserSchema, "User");

module.exports = userModel;