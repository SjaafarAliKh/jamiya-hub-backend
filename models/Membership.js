const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
    jamiya: {
        type: mongoose.Schema.Types.ObjectId,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    role: {
        type: String,
    },
    payoutPosition: {
        type: Number,
    },
    status: {
        type: String,
    },
}, { timestamps: true });

const membership = mongoose.model("membership", membershipSchema);

module.exports = membership;