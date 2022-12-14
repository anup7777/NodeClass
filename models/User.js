const mongoose = require('mongoose')
const { stringify } = require('uuid')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true,
        minLength: [5, 'Username should be longer than 5 characters']
    },
    password: {
        type:string,
        required: true
    }
}, {timestamps: true})