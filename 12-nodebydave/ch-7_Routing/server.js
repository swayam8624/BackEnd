const express=require('express');
const app=express();
const path=require('path');
const cors=require('cors');
const {logger,logEvents}=require("./middleware/logEvents");
const PORT=process.env.PORT || 3500;


//custom middleware logger
// app.use((req,res,next)=>{
//   logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`)
//   console.log(`${req.method} ${req.path}`);
//   next();
// })
app.use(logger);


//Cross Origin Resource Sharing
const whitelist=["https://www.google.com","http://127.0.0.1:5500",'http://localhost:3500'];//what domains should be able to access your domain for backend server
const corsOptions={
  //origin inside parenthesis is fetched by cors from where the request is made
  origin:(origin,callback)=>{
    if(whitelist.indexOf(origin)!==1 || !origin){
      callback(null,true);
      //callback takes first paramater as error and second as wether to allow the access or not
    }
    else{
      callback(new Error("Not allowed by cors"));
    }
  },
  optionsSuccessStatus:200
}
app.use(cors(corsOptions));




//built in middleware to handle urlencoded data
app.use(express.urlencoded({extended:false})); //added to get the data sent by form

//built-in middleware for json
app.use(express.json()); 

//serve static files
app.use('/',express.static(path.join(__dirname,'/public')));  //search public dir for the request before it moves to the route and now you need not to provide relative paths for these
app.use('/subdir',express.static(path.join(__dirname,'/public'))); //the subdir pages will have the applied css now if we have mentioned it inside the pages


app.use('/',require('./routes/root'))
app.use('/subdir',require('./routes/subdir')); //this will route any request coming for subdir to the router instead pof routes we are providing below using app.get
app.use('/employees',require('./routes/api/employees'));



//Route handlers
app.get('/hello(.html)?',(req,res,next)=>{
  console.log("Attempted to load hello.html");
  next();  //to call the next route in the chain
},(req,res)=>{
  res.send("Hello World!");
})


app.all('*',(req,res)=>{
  res.status(404);
  if(req.accepts('html'))
    res.sendFile(path.join(__dirname,'views','404.html')); 
  else if(req.accepts('json'))
    res.json({error:"404 Not Found"});
  else
    res.type('txt').send("404 Not Found");
});


//custom error handler (we can kee this inside our middleware folder inside a file)
app.use(function(err,req, res,next){
  logEvents(`${err.name}: ${err.message}`, 'errLog.txt');
  console.error(err.stack)
  res.status(500).send(err.message)
})

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
