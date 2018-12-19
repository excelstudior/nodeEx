var http=require('http');
var fs=require('fs');
var myReadStream=fs.createReadStream(__dirname+'/content/EmployeeLeave-ray-20181205164631-68b56e6d-0232-44cd-afff-a9ad0114733c.csv','utf8')

var server=http.createServer(function(req,res){
    var i=0;
    myReadStream.on('data',function(chunk){
        var content='<div id='+i+'>'+chunk+'</div>'
        res.write(content);
        i++;
        console.log(chunk)
    })
})

server.listen(3000);