const router = require("express").Router();
const User = require("../models/User")
const UserController = require("../controllers")

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await UserController.getUsers();
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ message: "Error with fetching all users", data: null });
    }
});

// Get a user by various search options
// All are optional, though if a user searches by city, they must also include a state
router.get("/search", async (req, res) => {
    const { city, state, gender, major, startDate, endDate } = req.query;

    try {
        const users = await UserController.getUsersBySearch(city, state, gender, major, startDate, endDate);
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
});

// Update a user
router.patch("/:id", async (req, res) => {
    const userId = req.params.id;
    const updateFields = req.body;

    try {
        const updatedUser = await UserController.updateUser(userId, updateFields);
        res.status(200).json({ data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
});

// Get a user by id
router.get("/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await UserController.getUserById(userId);
        res.status(200).json({ data: user });
    } catch (error) {
        res.status(500).json({ message: error.message, data: null });
    }
});

module.exports = router