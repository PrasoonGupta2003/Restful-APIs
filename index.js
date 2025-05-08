//REST->
//The REST (Representational State Transfer) concept is an architectural style for designing networked applications, primarily web services. 
//A standard set of HTTP methods is used:
// GET → Retrieve data.
// POST → Create a new resource.
// PUT → Update an existing resource.
// DELETE → Remove a resource.

const express = require("express");
const app = express();
const port=8080;
const { v4: uuidv4 } = require('uuid');
const methodOverride=require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.listen(port, () =>{
    console.log("App is listening on port 8080!");
})

let posts=[
    {
        id: uuidv4(),
        username:"Prasoon",
        content:"I love coding",
    },
    {
        id: uuidv4(),
        username:"Prashant",
        content:"Hi Everyone!",
    },
    {   
        id: uuidv4(),
        username:"Manya",
        content:"I live in Etawah and I love to eat",
    }
]

app.get("/", (req, res)=>{
    console.log("Server Working");
})
app.get("/posts", (req, res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req, res)=>{
    res.render("new.ejs")
})
app.post("/posts", (req, res)=>{
    let {username, content} = req.body;
    let id=uuidv4();
    posts.push({
        id:id,
        username:username,
        content:content,
    })
    res.redirect("/posts")
})
app.get("/posts/:id",(req, res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>p.id===id);
    res.render("show.ejs",post)
})
app.patch("/posts/:id", (req, res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>p.id===id);
    post.content=newContent;
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req, res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>p.id===id);
    res.render("edit.ejs",{post});
})
app.delete("/posts/:id", (req, res)=>{
    let{id}=req.params;
    posts=posts.filter((p)=>p.id!==id);
    res.redirect("/posts");
})