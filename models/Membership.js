const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema
const membership = mongoose.model("membership", membershipSchema);
module.exports = membership ;