import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// get streaming from server;
var tweetApp = tweetApp || {};
(function () {
    tweetApp.tweetStream = function(callback){
        var socket = io.connect();
        var self = this;

        // listen for tweets being emitted and when one is returned
        // notify the React compontent via a callback event.
        socket.on('tweet', function (data) {
            callback(data);
        });
    };
})();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
