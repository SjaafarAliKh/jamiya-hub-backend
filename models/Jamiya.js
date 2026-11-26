const mongoose = require("mongoose");
const jamiyaSchema = new mongoose.Schema({
  name  : {
    type:String 
  } ,
     description:{
     type:String
    } ,
    contributionAmount : {
        type:Number
    } ,
    frequency:{
        type:String
    } ,
    startDate:{
        type:Date
    } ,
    maxMembers:{
        type:Number
    } ,
    status:{
    type:String
    } ,
    inviteCode:{
    type:String ,
    unique:true
    }
})

const jamiya = mongoose.model("jamiya", jamiyaSchema);
module.exports = jamiya;






