import React, { Component } from 'react';
import './App.css';
import TweeterList from './components/tweeter-list';
import ConfigSetting from './components/config-setting';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    // 用來初始化新列表的訊息
    // debug 用, 一開始先初始化一個
    this.state = { 
      tweeterLists: [{title: "Lv75 シュヴァリエ・マグナ"}] 
    };
    this.tweetApp = {};
    
    this.tweetApp.tweetStream = (callback) => {
      const socket = socketIOClient('http://localhost:3001/');
      // listen for tweets being emitted and when one is returned
      // notify the React compontent via a callback event.
      socket.on('tweet', (data) => {
        callback(data);
      })
    }
    // this.socket = socketIOClient('http://localhost:3001/');
    // prevent warning msg
    this.cnt = 0;

    this.addTweeterList = this.addTweeterList.bind(this);
  }

  checkDup(title) {
    for(var i=0;i<this.state.tweeterLists.length;i++) {
      if(this.state.tweeterLists[i].title === title) {
        return false;
      }
    }
    return true;
  }

  addTweeterList(title) {
    let flag = this.checkDup(title);
    if(flag){
      this.setState({
        tweeterLists: this.state.tweeterLists.concat({title}) 
      });
    }
  }

  render() {
    const tweeterLists = this.state.tweeterLists.map((obj) => {
      return(
        <div className="gbfrf-column mdl-shadow--2dp" key={obj.title}>
          <TweeterList tweetApp={this.tweetApp} target={obj} />
        </div>
      )
    })

    return (
      <div className="gbfrf-container">
        <div className="gbfrf-main-content">
          <div className="gbfrf-columns">
              {tweeterLists}
          </div>
        </div>
        <ConfigSetting addTweeterList={this.addTweeterList}/>
      </div>
    );
  }
}

export default App;