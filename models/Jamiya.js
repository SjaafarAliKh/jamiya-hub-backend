const mongoose = require("mongoose");
const { randomBytes } = require('crypto');

const jamiyaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    contributionAmount: {
        type: Number,
        required: true,
        min: 1
    },
    frequency: {
        type: String,
        enum: ['weekly', 'monthly'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    maxMembers: {
        type: Number,
        required: true,
        min: 2
    },
    status: {
        type: String,
        enum: ['draft', 'active', 'completed'],
        default: 'draft'
    },
    inviteCode: {
        type: String,
        unique: true,
        uppercase: true,
        required: true,
        default: () => randomBytes(3).toString('hex').toUpperCase()
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

const Jamiya = mongoose.model("Jamiya", jamiyaSchema);
module.exports = Jamiya;
