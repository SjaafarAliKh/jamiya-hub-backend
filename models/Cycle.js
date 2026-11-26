const mongoose = require('mongoose')

const cycleSchema = new mongoose.Schema({
    jamiya: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jamiya',
        reqiured: true
    },

    cycleNumber: {
        type: Number,
        reqiured: true
    },

    dueDate: {
        type: Date,
        required: true
    },

    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Uesr',
        required: true
    },

    status: {
        type: String,
        enum: ['upcomming', 'active', 'completed'],
        default: 'upcomming'
    },
}, { timestamps: true })

cycleSchema.index({ jamiya: 1, cycleNumber: 1 }, { unique: true })



const cycle = mongoose.model("Cycle", cycleSchema);
module.exports = cycle;
