const express=require('express');
const app=express();
const path=require('path');
const PORT=process.env.PORT || 3500;





//ROUTES
//  ^a  ->Must begin with
//  a$  -> Must end with a
//  a|b ->Either a or b
//  (ab)->must come together
//  a?  ->can be there or cannot be    there
//  *   ->anything can be there
//  a+  ->a must be there atleast once 
//  /a/  -> matches anything with a in it

app.get('^/$|/index(.html)?',(req,res)=>{
  // res.sendFile('./views/index.html',{root:__dirname});
  res.sendFile(path.join(__dirname,'views','index.html'));
});
app.get('/new-page(.html)?',(req,res)=>{
  
  res.sendFile(path.join(__dirname,'views','new-page.html'));
});
app.get('/old-page(.html)?',(req,res)=>{
  res.redirect(301,'/new-page.html'); //302 by default
});


//Route handlers
app.get('/hello(.html)?',(req,res,next)=>{
  console.log("Attempted to load hello.html");
  next();  //to call the next route in the chain
},(req,res)=>{
  res.send("Hello World!");
})


//chaining route handlers
const one=(req,res,next)=>{
  console.log('one');
  next();
}
const two=(req,res,next)=>{
  console.log('two');
  next();
}
const three=(req,res)=>{
  console.log('three');
  res.send("Finished");
}

app.get('/chain(.html)?',[one,two,three]);

app.get('/*',(req,res)=>{
  res.status(404).sendFile(path.join(__dirname,'views','404.html')); 
});





app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
