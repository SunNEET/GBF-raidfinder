import React, { Component } from 'react';
import './App.css';
import TweeterFeed from './components/tweeter-feed';
import ConfigButton from './components/config-button';
import ConfigPage from './components/config-page';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    // 用來初始化新列表的訊息
    // debug 用, 一開始先初始化一個
    this.state = { tweeterFeeds: [{title: "lvl-001 BossName-a"}], showDialog: false };

    // tweetApp init
    this.tweetApp = {};
    this.tweetApp.tweetStream = (callback) => {
      const socket = socketIOClient('http://localhost:3001/');
      // listen for tweets being emitted and when one is returned
      // notify the React compontent via a callback event.
      socket.on('tweet', (data) => {
        callback(data);
      })
    }
    // prevent warning msg
    this.cnt = 0;
  }

  AddTweeterFeed() {
    this.setState({
      tweeterFeeds: this.state.tweeterFeeds.concat({title: "lvl xxx BossName ooo"}) 
    });
  }

  render() {
    const tweeterFeeds = this.state.tweeterFeeds.map((info) => {
      return(
        <div className="gbfrf-column mdl-shadow--2dp" key={this.cnt++}>
          <TweeterFeed tweetApp={this.tweetApp} info={info} />
        </div>
      )
    })
    // debugger;
    return (
      <div className="gbfrf-container">
        <ConfigPage showDialog={this.state.showDialog} hide={()=>{this.setState({showDialog: false})}}/>
        <div className="gbfrf-main-content">
          <div className="gbfrf-columns" ref="list">
              {tweeterFeeds}
          </div>
        </div>
        <ConfigButton showDialog={ () => { this.setState({showDialog: true}) } }/>
          {/* <ConfigButton addList={()=>this.setState({tweeterFeeds: this.state.tweeterFeeds.concat({title: "AAA"})})}/> */}
      </div>
    );
  }
}

export default App;

