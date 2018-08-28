var http=require('http');
var fs=require('fs');
var myReadStream=fs.createReadStream(__dirname+'/content/stream.txt','utf8')

var server=http.createServer(function(req,res){
    var i=0;
    myReadStream.on('data',function(chunk){
        var content='<div id='+i+'>'+chunk+'</div>'
        res.write(content);
        i++;
    })
})

server.listen(3000);