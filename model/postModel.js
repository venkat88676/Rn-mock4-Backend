const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    destination:{type:String,enum:["India","Africa","Europe", "America"],required:true} ,
    no_of_travelers:{type:Number,required:true},
    budget:{type:Number,required:true}
})

const PostModel=mongoose.model("post",postSchema)

module.exports={PostModel}