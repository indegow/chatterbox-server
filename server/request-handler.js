/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var utilities = require('./utilities.js');
var fs = require('fs');

var messages = [];

module.exports = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  // if(request.method === 'POST') {console.log('Request looks like: ', request)};
  var actions = {
    'GET': function(request, response) {
      utilities.sendResponse(response, {results: messages});
    },
    'POST': function(request, response) {
      
      //request.setEncoding('utf8');
      request.on('data', (chunk) => {
        console.log(chunk, 'before');
        chunk = chunk.toString();
        console.log(chunk, 'after');
        console.log(JSON.parse(chunk), 'PRASED');
        messages.push(JSON.parse(chunk));
        console.log(messages);

      }).on('end', () => {
        
        // let foo = JSON.parse(body);
        
        utilities.sendResponse(response, null, 201);
      });
    },
    'OPTIONS': function(request, response) {
      //get some data out of the request object and put it in
      //our messages store
      utilities.sendResponse(response, null);
    }
  };
  
  var action = actions[request.method];

  if (action) {
    action(request, response);
  } else {
    utilities.sendResponse(response, 'Not Found', 404);
  }


};

//need to store data?
//objectId, roomname, username, text, createdAt



