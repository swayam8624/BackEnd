const express=require('express');
const router=express.Router();
const data={};
data.employees=require('../../data/employees.json');


router.route('/')
  .get((req,res)=>{
    res.json(data.employees);
  })
  .post((req,res)=>{
    res.json({
      "firstname":req.body.firstname,
      "lastname":req.body.firstname
    });
  })
  .put((req,res)=>{
    res.json({
      "firstname":req.body.firstname,
      "lastname":req.body.firstname
    })
  })
  .delete((req,res)=>{
    res.json({"id":req.body.id})
  }) ; 

  router.route('/:id')
    .get((req, res)=>{
      res.json({"id":req.body.id});
    });
  



module.exports = router;