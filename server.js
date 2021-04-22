require('dotenv').config()
const express = require('express')
const mongoose =  require('mongoose')
const cors  = require('cors')
const cookieParser = require('cookie-parser')
const fileUpaload = require('express-fileupload')
const path = require('path')


const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpaload({
    useTempFiles: true
}))

// Routes 
app.use('/user' , require('./routes/userRouter'))
app.use('/api' , require('./routes/upload'))
const projectRouter = require("./routes/Projects");
const jobRouter = require("./routes/Jobs");
app.use("/projects",projectRouter);
app.use("/jobs",jobRouter);

app.use(express.static('img'))

// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true

}, err => {
    if(err) throw err;
    console.log("Connected to mongodb")
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT  =  process.env.PORT || 5000
app.listen(PORT, ()=> {
    console.log('Server is running on port ', PORT)
})