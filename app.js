const express = require('express')
var { default: mongoose, Schema } = require('mongoose')
const dotenv = require('dotenv')
const bodyparser= require('body-parser')
const cors = require('cors')
const app= express()
const {  generateOTP,
    checkUserExists,
    addUsertoDatabase}= require('./loginController')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true}))

app.use(cors())

const UserSchema = new mongoose.Schema({
    email: {
        type : String,
        required : true,
    }
})


app.post('/login', async(req,res,next) =>{

    const email = req.body.email
    const otp= generateOTP()
    const userExists = checkUserExists(email)
try{

    const user= await UserSchema.findOne({email})
    if (userExists){
        return user
    } 
    else{
        addUsertoDatabase(email,otp)
    }
}
   catch(error){
    console.log(error)
}

    next()
})




dotenv.config()
const port = 3000

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('MongoDB is connected')
}).catch((err)=>{
    console.log(err)
})
app.listen(port , () =>{
    console.log(`server is connected `)
})

module.exports = app;