var http = require('http');
var fs = require('fs');

var readChunks = function () {
    return new Promise(function (resolve, reject) {
        var chunks = [];
        var myReadStream = fs.createReadStream(__dirname + '/content/stream.txt', 'utf8')
        myReadStream.on('data', function (chunk) {

            chunks.push(chunk)
        }).on('close', function () {
            if (chunks.length !== 0) {
                resolve(chunks)
            } else if (chunks.length===0){
                reject("Empty")
            }
        })

    })
}

readChunks().then(function (results) { console.log(results) }).catch((error) => console.log(error))


var server = http.createServer(function (req, res) {

    readChunks().then(function (results) {
        results.forEach((result, i) => {
            var content = '<div id=' + i + '>' + result + '</div>'
            res.write(content);
        });
    }).catch(function(err){
        console.log(err)
        var content = '<p>' + err + '</p>'
            res.write(content);
    })


})

server.listen(3000);