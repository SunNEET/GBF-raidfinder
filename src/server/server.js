const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = 3001;
const path = require('path');

const twitter = require('twitter');
const twitterConfig = require('./secret/twitter');
const tweets = new twitter(twitterConfig);

console.log('** DEV **');

// start up the node server
server.listen(port, () => {
    console.log('listening on port ' + port);
});

// create a socket.io connection with the client
io.on('connection', (socket)=>{
    console.log('User connected. Socket id %s', socket.id);

    socket.on('disconnect',()=>{
        console.log('User disconnected. %s. Socket id %s', socket.id);
    });
});

// listen to the twitter stream and tweet comes in send it to the client real time
tweets.stream('statuses/filter', { track: 'javascript' }, function(stream) {
    stream.on('data', function (data) {
        io.sockets.emit('tweet', data);
        console.log(data.text);
    });
});