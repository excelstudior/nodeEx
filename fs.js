const fs=require('fs');
const os=require('os');
const readLine=require('readline');
let user=os.userInfo();
let content=fs.readFileSync('./content/1.txt').toString();
let lineCount=0;
console.log(`Hello ${user.username}, content in the file are`,content);

const rl=readLine.createInterface({
    input:fs.createReadStream('./content/1.txt')
})

rl.on('line',function(line){

    lineCount++;
    console.log(lineCount);
})
console.log(lineCount);
