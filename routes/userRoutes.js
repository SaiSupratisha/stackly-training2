const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");

const router = express.Router();


// ======================================================
// GET /users
// Get all users
// ======================================================

router.get("/", async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


// ======================================================
// GET /users/:id
// Get one user by ID
// ======================================================

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


// ======================================================
// POST /users
// Create a new user
// ======================================================

router.post("/", async (req, res) => {
    try {
        const { name, email, age, role } = req.body;

        if (!name || !email || age === undefined || !role) {
            return res.status(400).json({
                message: "Name, email, age and role are required"
            });
        }

        const user = await User.create({
            name,
            email,
            age,
            role
        });

        res.status(201).json(user);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


// ======================================================
// PUT /users/:id
// Update complete user
// ======================================================

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const { name, email, age, role } = req.body;

        if (!name || !email || age === undefined || !role) {
            return res.status(400).json({
                message: "Name, email, age and role are required"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                name,
                email,
                age,
                role
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(updatedUser);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


// ======================================================
// PATCH /users/:id
// Update selected fields
// ======================================================

router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(updatedUser);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


// ======================================================
// DELETE /users/:id
// Delete user
// ======================================================

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully",
            user: deletedUser
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


// ======================================================
// GET /users?role=developer&age=32
// Filter users
// ======================================================

router.get("/filter", async (req, res) => {
    try {
        const { role, age } = req.query;

        const filter = {};

        if (role) {
            filter.role = role;
        }

        if (age) {
            filter.age = Number(age);
        }

        const users = await User.find(filter);

        res.status(200).json(users);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


module.exports = router;