const server = require('./app.js');
const connectDatabase =require("./db.js");


const port =  process.env.PORT || 5000;

connectDatabase();


server.listen(port,()=>{
console.log("listening on port" , port);
});