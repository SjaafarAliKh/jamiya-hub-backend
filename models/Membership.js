const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
    jamiya: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Jamiya' ,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User' ,
        required : true 
    },
    role: {
        type: String,
       enum: ['organizer', 'member'],
      default: 'member',
      required: true
    },
    payoutPosition: {
        type: Number,
        min: 1,
      default: null
    },
    status: {
        type: String,
    enum: ['active', 'inactive'],
      default: 'active'
    },
}, { timestamps: true })
membershipSchema.index(
  { jamiya: 1, user: 1 },
  { unique: true }
);

const membership = mongoose.model("membership", membershipSchema);

module.exports = membership;