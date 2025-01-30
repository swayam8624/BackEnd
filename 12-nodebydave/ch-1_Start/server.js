/*

  - Node runs on server , not in browser
  - The console is terminal window
  - global object insetad of window object
  - has common core modules
  - common js modules instead of ES6 modules

*/

const {add,sub,mul,div}=require('./math')

// const os=require('os');
// const path=require('path');
// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())


// console.log(__dirname)
// console.log(__filename)

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));


console.log(add(10,20));
console.log(sub(30,20));
console.log(mul(10,20));
console.log(div(40,20));