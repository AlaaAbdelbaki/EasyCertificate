require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
// const fileUpaload = require('express-fileupload')
const path = require('path')
const app = express()
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
    }
});

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    console.log(username)
    if (!username) {
        return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
});

io.on("connection", (socket) => {
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            userID: id,
            username: socket.username,
        });
    }
    socket.emit("users", users);

    socket.on("visit", (profileName, user) => {
        console.log(JSON.stringify(user));
        console.log(JSON.stringify(profileName));
        console.log("visit from "+profileName.profile+"to "+profileName.id);
        socket.to(profileName.id).emit("recieveNotif", {
            profileName ,
        });
    });

    console.log(users)
});

app.use(express.json())
app.use(cors())
app.use(cookieParser())
// app.use(fileUpaload({
//     useTempFiles: true
// }))

// Routes 
const jobRouter = require("./routes/Jobs");
const projectRouter = require("./routes/Projects");
const NotificationRouter = require("./routes/Notifications");
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/upload'))
app.use("/projects", projectRouter);
app.use("/jobs", jobRouter);
app.use("/notifications", NotificationRouter);


app.use(express.static('img'))

// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true

}, err => {
    if (err) throw err;
    console.log("Connected to mongodb")
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000
http.listen(PORT, () => {
    console.log('Server is running on port ', PORT)
})