var URI=require('../database/config')
var mongoose=require('mongoose')
var _db;
var connectionState;

function initDbServer() {
    if (_db===undefined) {
        console.warn("Trying to init DB again!");
        return mongoose.connect(URI.url,handleConnect);

    } else{
        console.log('readyState ',_db.readyState)
    }
}

function handleConnect(err,db) {
    if (err) {
        return console.log(err)
    }
    console.log("DB initialized - connected to: " );
    console.log(db)
    connectionState=db.readyState
    _db = db;
}

function connectDb(){

}

module.exports= dbConnect={
    initDbServer,
    _db,
    connectionState
}