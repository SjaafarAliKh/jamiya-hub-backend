const mongoose = require("mongoose");
const AnnouncementSchema = new mongoose.Schema({
   title:{
      type:String,
      required:true 
   },
   body: {
   type:String,
   required:true
   },
   jamiya: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jamiya",
      required: true,
   },
   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
   },
   
}, { timestamps: true });

module.exports = mongoose.model("Announcement", AnnouncementSchema);