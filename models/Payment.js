const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    cycle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cycle',
        required: true
    },

    payer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'paid', 'confirmed'],
        default: 'pending'
    },

    paidAt: {
        type: Date
    },

    confirmedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true })

paymentSchema.index({ cycle: 1, payer: 1 }, { unique: true })


const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;