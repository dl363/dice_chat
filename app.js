var app = require('express')();
var http = require('http').createServer(app);
var url = require('url');
var io = require('socket.io')(http, {path: '/nodejsapp/socket.io'})

dice = randomIntInclusive(1,6);
roll = 0

function randomIntInclusive(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low)
}

app.get('/nodejsapp/', function(req, res){
    //var q = url.parse(req.url, true).query;
    // if ( q.roll ) {
    // 	dice = randomIntInclusive(1,q.roll);
    // 	roll++;
    // }
    // res.statusCode = 200;
    res.sendFile(__dirname + '/index.html');
    //res.send('<h1>roll ' + roll + ' --> ' + dice + '</h1>');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
      if (-1 != msg.toLowerCase().search("roll")) {
	  dice = randomIntInclusive(1,10);
	  roll++;
	  io.emit('chat message', msg + ' ['+roll+']->'+dice+'');
      }
      else {
	  io.emit('chat message', msg);
      }
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
