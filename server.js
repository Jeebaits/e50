//---import express modules
const express = require("express");
const fs = require("fs");
//---import utils using destructuring
const {createFolder, createFile} =require("./utils");
const postData = require("./data/posts.json");
//console.log(express);
const app = express();
//---pass incoming data
app.use(express.json());
//---create folder data
createFolder("data");
//---create file json
createFile("data/posts.json");
//-----routing api demo
//---home root route
app.get("/", (req, res)=>{
    res.send("HOME Route");
});
//---fetch all posts
app.get("/posts", function(req, res){
    // res.send("Fetch all post route");
    // res.json(postData);
    res.json({
        message: 'Fetched data successfully',
        postData
    });
});
//---fetch single post
app.get("/posts/:id", function(req, res){
    //---get the dynamic id from url params
    // console.log(req.params);
    const id = req.params.id;
    console.log(id);
    const postFound = postData.find((post) => {
        return post.id === id;
    });
    if(!postFound){
        res.json({message: "Post not found"});
    } else{
        res.json({postFound});
    }
    // res.send("Fetch single post");
});
//---create post
app.post("/posts", (req, res)=>{
    // console.log(req.body);
    // res.send("Create post");
    // get the post from user
    const newPost = req.body;
    // push the new post into existing post
    // postData.push({
    postData.unshift({
        ...newPost,
        id: ("100" + (postData.length + 1).toString())
    });
    console.log(postData);
    // write to file the new array set of value
    fs.writeFile("data/posts.json", JSON.stringify(postData), (err) => {
        if(err){
            console.log(err);
        }
        // send a message to user
        res.json({
            message: "Post created successfully"
        });
    });
    res.send("Create post");
});
//---create single post
app.post("/posts/:id", (req, res)=>{
    res.send("Create single post");
});
//---update post a url with params
app.put("/posts/:id", (req, res)=>{
    //get the dynamic id from url params
    //const id= req.params;
    const id= req.params.id;
    console.log(id);
    // get by destructuring
    // const {trainee, track, duration} = req.body;
    const {trainee, track, duration} = req.body;
    const postFound = postData.find((post) => {
        return post.id === id;
    });
    console.log(postFound);
    if(!postFound){
        return res.json({message: "Post not found"})
    }
    // filter out all post except the post matching the id
    const fileteredPost = postData.filter((post) => {
        return post.id !== id;
    });
    console.log(fileteredPost);
    // update the data currently found in post array
    postFound.trainee = trainee;
    postFound.track = track;
    postFound.duration = duration;
    console.log(postFound);
    // push the updated post into filtered array
    fileteredPost.unshift(postFound);
    console.log(fileteredPost);
    // write to file the filtered post
    fs.writeFile("data/posts.json", JSON.stringify(fileteredPost), (err) => {
        if(err){
            console.log(err);
        }
        // send a message to user
        res.json({
            message: "Post created successfully"
        });
    });
});
//---delete a single post
app.delete("/posts/:id",(req, res)=>{
     //---get the dynamic id from url params
    const id = req.params.id;
    // filter out all post except the post matching the id
    const fileteredPost = postData.filter((post) => {
        // return post except the matching id
        return post.id !== id;
    });
    console.log(fileteredPost);
     // write to file the filtered post
     fs.writeFile("data/posts.json", JSON.stringify(fileteredPost), (err) => {
        if(err){
            console.log(err);
        }
        // send a message to user
        res.json({
            message: "Post created successfully"
        });
    });
    // res.send("delete a single post");
});
//---create a server
app.listen(3000,function(){
    console.log("Server running at port 3000");
});