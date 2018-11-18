const https = require('https');

import config from '../../config'
import SaveToDb from './SavetoDB.js'
import TestIfLinkIsOk from './TestIfLinkIsOk.js'

var app = require('http').createServer(handler);
var statusCode = 403;

app.listen(9000);

function handler (req, res) {
  var data = '';

  if (req.method == "POST") {
    if (TestIfLinkIsOk.TestLink(req.url)) {
      //Data
      req.on('data', function(chunk) {
        data += chunk;
      });


      req.on('end', function() {
        // console.log(data.toString());

        //Db
        let DBUserID = TestIfLinkIsOk.TestLink(req.url);
        let DBData = data.toString();
        //SaveToDb
        SaveToDb.SaveWHtoDB(DBData, DBUserID);
        console.log('Webhook Recived under: ' + DBUserID);

        statusCode = 202;
      });
    } else {
      statusCode = 400;
    }
  } else if (req.method == "GET") {
    if (!TestIfLinkIsOk.TestLink(req.url)) {
      statusCode = 400;
      console.log('GET = link is NOT Fine!');
    } else {
      //change to 202
      statusCode = 400;
      console.log('GET = link is Fine');
    }

  }

  res.writeHead(statusCode, {'Content-Type': 'text/plain'});
  res.end();
}

console.log("Listening to port 9000");
console.log("Returning status code " + statusCode.toString());
