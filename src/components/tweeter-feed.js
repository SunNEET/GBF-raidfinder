import React, {Component} from 'react';
import _ from 'lodash';
import TweeterList from './tweeter-list';
import TweetBar from './tweet-bar';

class TweeterFeed extends Component {
    constructor(props){
        super(props);

        this.state = {
            tweets: []
        };
    }
    // this my custom function to add a tweet to the feed.
    // for performance reasons you treat you data as immutable.
    // that is why I am deep cloning the list and create a new list.
    // this lets React compare between the old and new list only change 
    // the differences.
    addTweet(tweet) {
        var tweets = _.cloneDeep(this.state.tweets);
        tweets.splice(0,0,tweet);
        tweets = _.take(tweets, 30);
        this.setState({
            tweets: tweets
        });
    }

    // This is a react function that is called right before the component
    // is added to the DOM
    componentDidMount(){
        const RaidRegexJapanese = new RegExp('(.*?)([0-9A-F]{8}) :参戦ID\n参加者募集！\n(.+)\n?(.*)', 'g');
        const RaidRegexEnglish = new RegExp('(.*?)([0-9A-F]{8}) :Battle ID\nI need backup!\n(.+)\n?(.*)', 'g');
        // const BossRegex = "Lv(?:l )?([0-9]+) (.*)";

        // debugger;
        // console.log(this.props.tweetApp);
        this.props.tweetApp.tweetStream( (tweet) => {
            // console.log(tweet.text);
            // 1. parse the tweet
            var arrJP = RaidRegexJapanese.exec(tweet.text);
            var arrENG = RaidRegexEnglish.exec(tweet.text);
            // console.log(arrJP);
            // console.log(arrENG);
            // 2. filter the tweet and then add it to the list
            if(arrJP && arrJP[3] === this.props.target.title){
                this.addTweet(tweet);
            } else if(arrENG && arrENG[3] === this.props.target.title) {
                this.addTweet(tweet);
            }
        } )
    }
    
    render() {
        return(
            <div>
                <div className="mdl-layout mdl-layout--fixed-header">
                    <header className="mdl-layout__header">
                        <div className="mdl-layout__header-row gbfrf-column__header-row">
                            <div className="mdl-layout-title gbfrf-column__header">
                                <TweetBar info={this.props.target}/>
                            </div>
                        </div>
                    </header>
                </div>
                <div className="mdl-layout__content">
                    <TweeterList tweets={this.state.tweets}/>                
                </div> 
            </div>
        );
    }
}

export default TweeterFeed;