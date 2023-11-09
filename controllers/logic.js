const { admin, addBook, user } = require("../collection/collection");
const isAdminMiddleware = require('../middlewares/edit-delete')
const bcrypt = require('bcrypt')

//admin login
const adminLogin = (req, res) => {
    const { uname, psw } = req.body
    console.log(req.body);
    admin.findOne({ uname }).then((ad) => {
        console.log(ad);
        if (ad) {
            if (ad.psw === psw) {
                res.status(200).json({
                    message: "Login successfully",
                    status: true,
                    statusCode: 200,
                });
            } else {
                res.status(404).json({
                    message: "Incorrect Password",
                    status: false,
                    statusCode: 404,
                });
            }
        } else {
            res.status(404).json({
                message: "Incorrect data",
                status: false,
                statusCode: 404,
            });
        }
    }).catch((error) => {
        console.error("Database error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            status: false,
            statusCode: 500,
        });
    });
}
//book add
const bookAdd = async (req, res, next) => {
    const { bname, author, title, category, year } = req.body
    if (!bname) {
        return next('Book name is required')
    }
    if (!author) {
        return next('Author is  required')
    }
    if (!title) {
        return next('Title required')
    }
    if (!category) {
        return next('Category required')
    }
    if (!year) {
        return next('Year required')
    }
    try {
   const data=await addBook.create({
            bname, author, title, category, year
        })
        res.status(201).json({
            message: "Book Added",
            status: true,
            statusCode: 201,
           data
        });
        console.log(data);

    } catch (error) {
        return next(error)
    }

}
//get all books

const allBooks = (req, res) => {
    addBook.find().then(data => {
        if (data) {
            res.status(200).json({
                message: data,
                status: true,
                statusCode: 200
            })
        } else {
            console.log('No data found');
        }
    })
}
// view book

const viewOneBook = (req,res)=>{
    const {id} = req.params
    addBook.findOne({_id:id}).then(data=>{
        if(data){
            res.status(200).json({
                message: data,
                status: true,
                statusCode: 200
            })
        }else{
            res.status(404).json({
                message: "No book found",
                status: false,
                statusCode: 404
            })
        }
    })
}
const editBooks =(req,res)=>{
    const {id} =req.params
    const{
        bname, author, title, category, year 
    } = req.body
   addBook.findOne({_id:id}).then(data=>{
    if(data){
        data.bname=bname,
        data.author = author,
        data.title =title,
        data.category=category, 
        data.year=year
        data.save()
            res.status(200).json({
                message: "Book details Updated",
                status: true,
                statusCode: 200
            })
    }
   })
}

const deleteBook =async (req,res)=>{
    const id = req.params
   await addBook.deleteone({_id:id})
   res.status(200).json({
    message: "Book details deleted",
    status: true,
    statusCode: 200,
});
}

//user reg

const userReg = async (req, res, next)=> {
    const { email, psw } = req.body
    const existUser = await user.findOne({email})
    if(existUser){
        return next("Email id already registered");
    }
    const hashedPw = await bcrypt.hash(psw, 10);
    const newUser = await user.create({
        email,
        psw:hashedPw
    })
    console.log(newUser);
    res.status(201).json({
        message: "Registered Successfully",
        status: true,
        statusCode: 201,
        user: newUser,
    });
}
const userLogin = async (req,res,next)=>{
    const {email,psw} = req.body
    if(!email||!psw){
        return next("Provide all fields")
    }
    const usr = await user.findOne({email})
    if(usr){
        const decryptpsw = await bcrypt.compare(psw,usr.psw)
        if(decryptpsw){
            res.status(200).json({
                message: "Login successfully",
                status: true,
                statusCode: 200,
                _id: ur._id
                })
        }else{
            res.status(404).json({
                message: "Incorrect password",
                status: false,
                statusCode: 404
            });
        }
    }else{
        res.status(404).json({
            message: "No user Found",
            status: false,
            statusCode: 404
        });
    }

}


// Search for books
const searchBooks = async (req, res, next) => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            return res.status(400).json({
                message: "Please provide a search keyword",
                status: false,
                statusCode: 400,
            });
        }
        const books = await addBook.find({
            $or: [
                { bname: { $regex: keyword, $options: 'i' } },
                { author: { $regex: keyword, $options: 'i' } },
            ],
        });

        if (books.length === 0) {
            return res.status(404).json({
                message: "No matching books found",
                status: false,
                statusCode: 404,
            });
        }

        res.status(200).json({
            message: books,
            status: true,
            statusCode: 200,
        });
    } catch (error) {
        next(error);
    }
};




module.exports = { adminLogin, bookAdd, allBooks,userReg,userLogin,viewOneBook,editBooks,deleteBook,searchBooks }



