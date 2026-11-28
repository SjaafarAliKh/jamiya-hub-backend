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
        enum: ['pending', 'approved', 'rejected'],
        required: true,
        default: 'pending'
    }

}, { timestamps: true })

joinRequestSchema.index({ jamiya: 1, user: 1 }, { unique: true })

const JoinRequest = mongoose.model("JoinRequest", joinRequestSchema);
module.exports = JoinRequest;