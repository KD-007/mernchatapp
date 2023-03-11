const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectDatabase = ()=>{
    // console.log(process.env.DB_PASS);
    mongoose.connect(process.env.DB).then(()=>console.log('connected to database'))
    .catch(e=>{
        console.log("error connecting to database");
        console.log(e)
    });
}

module.exports=connectDatabase;