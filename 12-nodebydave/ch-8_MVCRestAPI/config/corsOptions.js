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

module.exports=corsOptions;