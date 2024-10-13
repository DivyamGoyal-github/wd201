//Using streams module of node.js
const http = require("http");
const fs = require("fs");
const server = http.createServer((req,res)=>{
    const stream = fs.createReadStream("sample.txt");
    stream.pipe(res);
})

server.listen(3000);




//Using fs module of node.js

// const http = require("http");
// const fs =require("fs");

// const server = http.createServer((req,res)=>{
//     fs.readFile("sample.txt",(err,data)=>{
//         res.end(data);
//     })
// });
// server.listen(3000);