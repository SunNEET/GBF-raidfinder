const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');
const port = 3001;

const twitter = require('twitter');
const twitterConfig = require('./secret/twitter');
const tweets = new twitter(twitterConfig.config);

console.log('** DEV **');
app.get('/normalRaidBoss', (req, res)=>{
    // 從 assets/test.txt 把 boss 資料讀出來
    fs.readFile(`${__dirname}/../assets/normalRaidBoss.txt`, 'utf-8', (err, data) => {
        if(err){
            throw err;
        }
        // console.log(data);
        // console.log(typeof data);
        res.json(data);
    })
})

// start up the node server
server.listen(port, () => {
    console.log('Listening on port ' + port);
});

// create a socket.io connection with the client
io.on('connection', (socket)=>{
    console.log(`User connected. Socket id ${socket.id}`);
    socket.on('disconnect',()=>{
        console.log(`User disconnected. Socket id ${socket.id}`);
    });
});

// listen to the twitter stream and tweet comes in send it to the client real time
tweets.stream('statuses/filter', { track: "参加者募集！,I need backup!" }, (stream) => {
    stream.on('data', (data) => {
        io.sockets.emit('tweet', data);
        // console.log(data.text);
    });
});