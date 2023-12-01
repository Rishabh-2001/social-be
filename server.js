const express = require('express');
const jwt=require('jsonwebtoken')
const { db } = require('./db/models');
const path = require('path');
const cors = require('cors');
const http = require('http');
const app = express();
const {initializeSocket}=require('./socketHandler')
const port = process.env.PORT || 3434;
const SECRET_KEY="Rishabh#2206"


const server = http.createServer(app);
const io=initializeSocket(server);

 

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));




// const {userRoute}=require('./routes/users/')
const {postsRoute}=require('./routes/posts');
const {commentsRoute}=require('./routes/posts/comments');
const { likesRoute } = require('./routes/posts/likes');
const {authRoute}= require('./routes/auth')
const {profileRoute }= require('./routes/profile')
const {friendsRoute} = require('./routes/friends');
const { notificationRoute } = require('./routes/posts/notification');



//  express.static(path.join(__dirname,'public'));
// app.use('/api/posts', express.static(path.join(__dirname,'public')))

app.use('/api/posts',postsRoute)
app.use('/api/comments',commentsRoute)
app.use('/api/likes',likesRoute)
app.use('/api/auth', authRoute)
app.use('/api/profile', profileRoute);
app.use('/api/friends', friendsRoute);
app.use('/api/notifications', notificationRoute)


// app.use('/posts/comments',express.static(path.join(__dirname,commentsRoute)))
db.sync()
   .then(()=>{
    server.listen(port,()=>{
        console.log("server is running at port ",port);
    })  
})
.catch(err=>{
   console.log(err.message);
})


// app.get('/',(req,res)=>{
//     res.send("Home page");
// })

// app.use('/',express.static(path.join(__dirname,'public')));

/*
## FLOW


IN CONTROLLERS::
       USERS.JS
          CONTAINS FUNCTION REALTED TO ALL OP OF USERS CRUD
    
        COMMENTS.JS
           CONTAINS FUNCTION REALTED TO ALL OP REALTED TO THE COMMENTS

        SAME WITH
        POSTS.JS
        
DB
   MODEL.JS CONTAIN DB CONEECTION AND DB TABLES AND SCHEMAS

ROUTE
    tO HANDLE ALL THE DIFFERENT -2 ROUTES




   DEFINE DB
   CREATE USER AND PROVIDE THE PRIVILEGES
   CREATE USER 
   CREATE POST :::TITLE , BODY, USER WHO CREATED IT
   CREATING COMMENT:::: WHICH POST,WHICH USER, BODY




*/