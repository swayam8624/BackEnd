const express=require('express');
const router=express.Router();
const path=require('path');


router.get('^/$|/index(.html)?',(req,res)=>{
  res.sendFile(path.join(__dirname,'..','views','subdir','index.html'));
});
router.get('/test(.html)?',(req,res)=>{
  res.sendFile(path.join(__dirname,'..','views','subdir','test.html'));
});

//if we access something which is not present then we will get our error page as it routes to app.get('*') and shows the 404 but now this 404 will not have any styles applied to it as we have not told our subdir to use the public directory for the subdir.
//To make this css available to subdir we will create a middleware for it like `app.use('/subdir',express.static(path.join(__dirname,'/public'))); `

module.exports = router;