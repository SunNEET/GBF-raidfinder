import React, { Component } from 'react';
import './App.css';
import TweeterFeed from './components/tweeter-feed';
import socketIOClient from 'socket.io-client';
import { Container } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    // 用來初始化新列表的訊息
    // debug 用, 一開始先初始化一個
    this.state = { tweeterFeeds: [{title: "lvl-001 BossName-a"}] };

    this.tweetApp = {};
    this.tweetApp.tweetStream = (callback) => {
      const socket = socketIOClient('http://localhost:3001/');
      // listen for tweets being emitted and when one is returned
      // notify the React compontent via a callback event.
      socket.on('tweet', (data) => {
        callback(data);
      })
    }
    
    // this.setState({
    //   tweeterFeeds: this.state.tweeterFeeds.concat({title: "lvl xxx BossName ooo"}) 
    // });
  }

  render() {

    const tweeterFeeds = this.state.tweeterFeeds.map((info) => {
      return(
        <TweeterFeed tweetApp={this.tweetApp} info={info}/>
      )
    })

    // debugger;
    return (
      <div className="App">
        <Container>
          {tweeterFeeds}

        </Container>
      </div>
    );
  }
}

export default App;
