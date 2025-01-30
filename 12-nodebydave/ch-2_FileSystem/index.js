const fs=require('fs');

const path=require('path');


//reads file - outputs data in buffer format
fs.readFile('./files/starter.txt',(err,data)=>{
  if(err) throw err;
  console.log(data);
})


//reads file - outputs the data in string format
fs.readFile(path.join(__dirname,'files','starter.txt'),'utf8',(err,data)=>{
  if(err) throw err;
  console.log(data);
})



//rewrites the existinf file and creates a new file if not present 
fs.writeFile(path.join(__dirname,'files','reply.txt'),'Nice to meet you',(err)=>{
  if(err) throw err;
  console.log('write complete');
})

//appends data into existing and create new file if not present
fs.appendFile(path.join(__dirname,'files','reply.txt'),'\nAppending data',(err)=>{
  if(err) throw err;
  console.log('append complete');
})



//rename a file
fs.rename(path.join(__dirname,'files','reply.txt'),path.join(__dirname,'files','reply2.txt'),(err)=>{
  if(err) throw err;
  console.log('rename complete');
}
)


//to delete a file
fs.unlink(path.join(__dirname,'files','reply2.txt'),(err)=>{
  if(err) throw err;
  console.log('delete complete');
})


//to throw uncaught errors like file name doesn't exists or something 
process.on('uncaughtException',err=>{
  console.log(`There was an uncaught error: ${err}`)
  process.exit(1);
})
