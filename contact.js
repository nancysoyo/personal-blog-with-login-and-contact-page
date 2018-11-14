const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailler = require('nodemailer');
const path = require('path');
const app = express();
// view engin setup
app.engine("handlerbars",exphbs());
app.set("view engine","handlebars");
//static folder
app.use('/public',express.static(path.join(__dirname,'public')));
// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
	res.send("hello");

});
app.listen(300,()=> console.log("server started..."));
