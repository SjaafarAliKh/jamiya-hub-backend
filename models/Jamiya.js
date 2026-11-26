const mongoose = require("mongoose");
const jamiyaSchema = new mongoose.Schema({
  name  : {
    type:String ,
    required : true 
  } ,
     description:{
     type:String
    } ,
    contributionAmount : {
        type:Number ,
        required : true , 
        min : 1
    } ,
    frequency:{
        type:String ,
        enum:['weekly' , 'monthly'] ,
        required : true
    } ,
    startDate:{
        type:Date ,
        required:true
    } ,
    maxMembers:{
        type:Number ,
        required:true ,
        min:2
    } ,
    status:{
    type:String ,
    enum : ['draft' , 'active' , 'completed'] ,
    default:'draft'
    } ,
    inviteCode:{
    type:String ,
    unique:true ,
    uppercase:true ,
    required : true ,
    defualt:()=> randomBytes(3).toString('hex').toUppercase()
    } ,
    organizer:{
        type: mongoose.Schema.Types.ObjectId ,
        ref:'User' , 
        required : true 
    }
})

const jamiya = mongoose.model("jamiya", jamiyaSchema);
module.exports = jamiya;






