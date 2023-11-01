const mongoose= require('mongoose')
const app= require('./app')

const otpGenerator = require('otp-generator')
const UserSchema = new mongoose.Schema({
    email: {
        type : String,
        required : true,
    }
})
function generateOTP(){
    const otp = otpGenerator.generate(6, { digits:true, alphabets: false})
    return otp
}
async function checkUserExists(email){
    {
        try{
            const user= await  UserSchema.findOne(email)
            return user;
        }catch(err){
            console.log(err)
        }
    }
}

async function addUsertoDatabase(email,otp){
    try {
        const newuser=new UserSchema ({
            email:email,
            otp:otp
        })
   
    await newuser.save()
    console.log("new user added to the database",newuser)
    } catch (error) {
        console.log(error)
    }
    
}


module.exports ={
    generateOTP,
    checkUserExists,
    addUsertoDatabase
}