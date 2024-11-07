import express from "express";
import bodyParser from "body-parser";

const app= express();
const port= 3000;

var bodyContent= [];
var index;
var started= false;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.render("index.ejs", {bodyFile:bodyContent, receptor: started});
    console.log(started);
});

app.get("/blogPost", (req, res)=>{
    res.render("blogpost.ejs");
});

app.get("/edit", (req, res)=>{
    res.render("edit.ejs");
});

app.post("/submit", (req, res)=>{
    started= true;
    bodyContent.push(req.body["blogPost"]);
    res.render("index.ejs", {bodyFile: bodyContent, receptor: started});
    console.log(bodyContent);
    console.log(started);
});


app.post("/edit", (req, res)=>{
    console.log(req.body["changeRoute"]);
    index= bodyContent.indexOf(req.body["changeRoute"]);
    console.log(index);
    const editBodyText= req.body["changeRoute"];
    res.render("edit.ejs", {editBody: editBodyText});
});

app.post("/update", (req, res)=>{
    const updatedText= req.body["editBody"];
    bodyContent[index]= updatedText;
    console.log(bodyContent[index]);
    res.render("index.ejs", {bodyFile: bodyContent, receptor: started});
});

app.post("/delete", (req, res)=>{
    var i= bodyContent.indexOf(req.body["deleteRoute"]);
    console.log("This is bodycontent:"+bodyContent[i]);
    bodyContent.splice(i, 1);
    console.log(bodyContent);
    res.render("index.ejs", {bodyFile: bodyContent, receptor: started});
    console.log("Delete request called");
});

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
});