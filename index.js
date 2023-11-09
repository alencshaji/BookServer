const cors = require('cors')  
require('dotenv').config()
const express = require ('express')
const router = require('./router/routes')
const errorMiddleware = require('./middlewares/error')
const server = express()
server.use(express.json())
server.use(router)
server.use(errorMiddleware)
require('./connection/connection')
const port =5009 || process.env.PORT
server.listen(port,()=>{
    console.log("Server started at",port);
})