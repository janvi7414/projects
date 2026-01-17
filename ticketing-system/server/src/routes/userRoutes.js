const express = require("express");
const { verifyAuth } = require("../middlewares/authMiddleware");


const router = express.Router();

// to get logged-in user info
router.get("/me", verifyAuth, (req, res) => {
    res.status(200).json({
        success: true,
        message: "User info retrieved successfully",
        user: req.user,
    });
});

module.exports = router;