const mongoose = require("mongoose");

const joinRequestSchema = new mongoose.Schema({
    jamiya: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jamiya',
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    status: {
        type: String,
        required: true,
        default: 'pending'
    }

}, { timestamps: true })

const JoinRequest = mongoose.model("JoinRequest", joinRequestSchema);

module.exports = JoinRequest;