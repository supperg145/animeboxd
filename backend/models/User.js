const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    watchList: [{
        anilistId: {
            type: Number,
            required: true
        },
        addedAt: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            default: "Currently Watching",
            enum: ["Currently Watching", "Completed", "On Hold", "Dropped", "Plan to Watch"]
        },
        score: {
            type: Number,
            default: 0
        },
        notes: {
            type: String,
            default: ""
        },
    }]
})

module.exports = mongoose.model("User", userSchema);