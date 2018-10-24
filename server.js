const express = require('express')
const app = express();

const port = 3000
var dbConnect=require('./database/db')

//dbConnect.initDb();
var initDbServer=function(req,res,next){
    dbConnect.initDbServer();
    next();
}


app.use(initDbServer)
app.get('/',(req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))