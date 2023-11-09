const mongoose = require('mongoose')
const { isEmail } = require('validator');

const adminSchema = mongoose.Schema({
    uname: String,
    psw: String
})

const admin = mongoose.model('admin', adminSchema)

const bookSchema = mongoose.Schema({
    bname: {
        type: String,
        required: [true, 'Book name is required']
    },
    author: {
        type: String,
        required: [true, 'Book author is required']
    },
    title: {
        type: String,
        required: [true, 'Book title is required']
    },
    category: {
        type: String,
        required: [true, 'Book category is required']
    },
    year: {
        type: String,
        required: [true, 'Published Year is required']
    },

},
    { timeStamps: true }
)
const addBook = mongoose.model('book', bookSchema)



//user
const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: [true, "Email is required"],
        validator: {
            validate: isEmail,
            message: "Invalid email format"
        }
    },
    psw: {
        type: String,
        require: [true, "Password required"]
    },
    role: {
        type: String,
        default: "user", 
    },

},
    { timeStamps: true }
)
const user = mongoose.model("user", userSchema)


module.exports = { admin, addBook, user }