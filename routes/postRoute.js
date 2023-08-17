const express=require("express");

const {PostModel}=require("../model/postModel")


const postRoute=express.Router();

postRoute.post('/',async(req,res)=>{
    try{
        const payload=req.body
        const post=new PostModel(payload)
        await post.save()
         res.status(201).send({"msg":"New Post Added"}) 
    }catch(err){
        res.status(400).send({"msg":err.message}) 
    }
    
})

postRoute.get('/',async(req,res)=>{
    try {
        const { destination, sortBy } = req.query;
        let query = PostModel.find();
        let sort = 1; 

        if (destination) {
            query = query.where('destination', destination);
        }

        if (sortBy === 'asc') {
            sort = 1; 
        } else if (sortBy === 'desc') {
            sort = -1; 
        }

        query = query.sort({ budget: sort });
        const bookings = await query.exec();
        res.status(200).send(bookings);
    } catch (err) {
        res.status(400).send({ "msg": err.message });
    }
    
})

postRoute.delete('/:id',async(req,res)=>{
    const postId=req.params.id
    try{
        const deletedData=await PostModel.findByIdAndDelete({_id:postId})
        res.status(202).send(deletedData)
    }
    catch(err){
        res.send(err)
    }
    
})

module.exports={postRoute}