const mongoose=require('mongoose')
mongoose.connect(process.env.BASE_URL, {    
}).then(() => {
    console.log("____Mongoose connected_______");
}).catch((err) => {
    console.error("Mongoose connection error:", err);
});
