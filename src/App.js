import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import TweeterFeed from './components/tweeter-feed';
import ConfigSetting from './components/config-setting';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    // 用來初始化新列表的訊息
    // debug 用, 一開始先初始化一個
    this.state = { tweeterFeeds: [{title: "Lv75 シュヴァリエ・マグナ"}, {title: "Lv90 ゼピュロス"}] };

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

    this.addTweeterFeed = this.addTweeterFeed.bind(this);
  }

  checkDup(title) {
    for(var i=0;i<this.state.tweeterFeeds.length;i++) {
      if(this.state.tweeterFeeds[i].title === title) {
        return false;
      }
    }
    return true;
  }

  addTweeterFeed(title) {
    let flag = this.checkDup(title);
    if(flag){
      this.setState({
        tweeterFeeds: this.state.tweeterFeeds.concat({title}) 
      });
    }
  }



  render() {
    const tweeterFeeds = this.state.tweeterFeeds.map((obj) => {
      console.log(obj);
      return(
        <div className="gbfrf-column mdl-shadow--2dp" key={this.cnt++}>
          <TweeterFeed tweetApp={this.tweetApp} target={obj} />
        </div>
      )
    })
    return (
      <div className="gbfrf-container">
        <div className="gbfrf-main-content">
          <div className="gbfrf-columns">
              {tweeterFeeds}
          </div>
        </div>
        <ConfigSetting addTweeterFeed={this.addTweeterFeed}/>
      </div>
    );
  }
}

export default App;

{/* <ConfigButton addList={()=>this.setState({tweeterFeeds: this.state.tweeterFeeds.concat({title: "AAA"})})}/> */}