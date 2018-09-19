import React, { Component } from 'react';
import './App.css';
import TweeterFeed from './components/tweeter-feed';
import socketIOClient from 'socket.io-client';
import { Container } from 'reactstrap';


class App extends Component {
  constructor(props) {
    super(props);

    this.tweetApp = {};
    this.tweetApp.tweetStream = (callback) => {
      const socket = socketIOClient('http://localhost:3001/');
      // listen for tweets being emitted and when one is returned
      // notify the React compontent via a callback event.
      socket.on('tweet', (data) => {
        callback(data);
      })
    }
  }

  render() {
    // debugger;
    return (
      <div className="App">
        <Container>
          <TweeterFeed tweetApp={this.tweetApp}/>
        </Container>
      </div>
    );
  }
}

export default App;
