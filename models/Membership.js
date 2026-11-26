const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
    jamiya: {
        type: String,
        required: true,
    },
});
const membership = mongoose.model("membership", membershipSchema);
  
module.exports = membership ;