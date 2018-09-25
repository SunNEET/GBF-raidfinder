import React, { Component } from 'react';
import './App.css';
import TweeterList from './components/tweeter-list';
import ConfigSetting from './components/config-setting';
import Viramate from './components/viramate';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    // 用來初始化新列表的訊息
    // debug 用, 一開始先初始化一個
    this.state = { 
      tweeterLists: [],
      aria_hidden: true,
      copyID: ""
    }; 
    this.tweetApp = {};
    this.tweetApp.tweetStream = (callback) => {
      // const socket = socketIOClient('http://localhost:3001/');
      const socket = socketIOClient('https://nepu-friends-2.herokuapp.com/');
      // listen for tweets being emitted and when one is returned
      // notify the React compontent via a callback event.
      socket.on('tweet', (data) => {
        callback(data);
      })
    }

    this.addTweeterList = this.addTweeterList.bind(this);
    this.removeTweeterList = this.removeTweeterList.bind(this);
    this.showAria = this.showAria.bind(this);
    this.tryJoinRaid = this.tryJoinRaid.bind(this);
  }

  checkDup(title) {
    for(var i=0;i<this.state.tweeterLists.length;i++) {
      if(this.state.tweeterLists[i].title === title) {
        return false;
      }
    }
    return true;
  }

  addTweeterList(title, subtitle) {
    console.log(`${title}, ${subtitle}`);
    let flag = this.checkDup(title);
    if(flag){
      this.setState({
        tweeterLists: this.state.tweeterLists.concat({title, subtitle}) 
      });
    }
  }

  removeTweeterList(title) {
    this.setState({
      tweeterLists: this.state.tweeterLists.filter( el => el.title !== title )
    })
    console.log("remove");
    console.log(title);
  }

  showAria(roomID) {
    this.setState({aria_hidden: false, copyID: roomID});
    setTimeout(()=>{
      this.setState({aria_hidden: true});
    },3000)
  }

  tryJoinRaid(roomID) {
    console.log(this.ifr);
    console.log(roomID);
    this.ifr.contentWindow.postMessage({type: "tryJoinRaid", raidCode: roomID}, '*');
  }

  render() {
    const tweeterLists = this.state.tweeterLists.map((obj) => {
      return(
        <div className="gbfrf-column mdl-shadow--2dp" key={obj.title}>
          <TweeterList 
            tweetApp={this.tweetApp} 
            target={obj} 
            remove={this.removeTweeterList}
            showAria={this.showAria}
            tryJoinRaid={this.tryJoinRaid}/>
        </div>
      )
    })

    return (
      <div className="gbfrf-container">
        <div className="gbfrf-main-content">
          <div className={"mdl-js-snackbar mdl-snackbar" + (!this.state.aria_hidden ? " mdl-snackbar--active" : "")} data-upgraded=",MaterialSnackbar" aria-hidden={this.state.aria_hidden}>
            <div className="mdl-snackbar__text gbf-snackbar_text">{this.state.copyID} copied to clipboard</div>
          </div>
          <div className="gbfrf-columns">
              {tweeterLists}
          </div>
        </div>
        <ConfigSetting addTweeterList={this.addTweeterList}/>
        {/* <Viramate /> */}
        <iframe 
            id="viramate-api" 
            src="chrome-extension://fgpokpknehglcioijejfeebigdnbnokj/content/api.html" 
            width="1" height="1"
            ref={f=>this.ifr=f}>
        </iframe>
      </div>
    );
  }
}

export default App;