require('dotenv').config();
const mongoose = require('mongoose');

const atlaslUser = process.env.ATLASUSERNAME
const atlaslpass = process.env.ATLASPASSWORD

// const url = `mongodb+srv://${atlaslUser}:${atlaslpass}@cluster0.dxjpqik.mongodb.net/`
const url = 'mongodb://localhost/StudentScore'
mongoose.connect(url).then(()=>{
    console.log('Connected to MongoDB')
}).catch((error)=>{
    console.log('Cannot connect to mongodb' + error)
})
