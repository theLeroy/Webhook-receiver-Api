import config from '../../config'
import SaveToDb from './SavetoDB.js'

var app = require('http').createServer(handler);
var statusCode = 200;

app.listen(9000);

function handler (req, res) {
  var data = '';

  if (req.method == "POST") {
    req.on('data', function(chunk) {
      data += chunk;
    });

    req.on('end', function() {
      console.log('Received body data:');
      console.log(data.toString());
      //Db

      SaveToDb.SaveWHtoDB(data)

      //Flie
 // var fs = require('fs');fs.writeFile("./webHooksDB", data, function(err) {if(err) {return console.log(err);}console.log("The file was saved!");});
    });

  }

  res.writeHead(statusCode, {'Content-Type': 'text/plain'});
  res.end();
}

console.log("Listening to port 9000");
console.log("Returning status code " + statusCode.toString());
