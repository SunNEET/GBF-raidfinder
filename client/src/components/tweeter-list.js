import React, {Component} from 'react';
import TweetComponent from './tweet';
import TweetBar from './tweet-bar';
import _ from 'lodash';

class TwitterList extends Component {
    constructor(props) {
        super(props);

        this.state = { tweets: [] };
    }

    addTweet(tweet) {
        var tweets = _.cloneDeep(this.state.tweets);
        tweets.splice(0,0,tweet);
        tweets = _.take(tweets, 30);
        this.setState({
            tweets: tweets
        });
    }

    componentDidMount(){
        const RaidRegexJapanese = new RegExp('(.*?)([0-9A-F]{8}) :参戦ID\n参加者募集！\n(.+)\n?(.*)', 'g');
        const RaidRegexEnglish = new RegExp('(.*?)([0-9A-F]{8}) :Battle ID\nI need backup!\n(.+)\n?(.*)', 'g');
        // const BossRegex = "Lv(?:l )?([0-9]+) (.*)";

        this.props.tweetApp.tweetStream( (tweet) => {
            // 1. parse the tweet
            var arrJP = RaidRegexJapanese.exec(tweet.text);
            var arrENG = RaidRegexEnglish.exec(tweet.text);
            // 2. filter the tweet and then add it to the list
            if(arrJP && arrJP[3] === this.props.target.title){
                this.addTweet(tweet);
            } else if(arrENG && arrENG[3] === this.props.target.title) {
                this.addTweet(tweet);
            }
        } )
    }

    componentWillUnmount() {
        console.log(`I'm going to unmounted ${this.props.target.title}`);
        
    }

    render() {
        const tweets = this.state.tweets.map((tweet) => {
            return (
                <TweetComponent key={tweet.id} tweet={tweet} showAria={this.props.showAria} tryJoinRaid={this.props.tryJoinRaid}/>
            );
        });

        return(
            <div className="mdl-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header">
                    <TweetBar info={this.props.target} remove={this.props.remove}/>
                </header>
                <div className="mdl-layout__content">
                    <ul className="mdl-list gbfrf-tweets">
                        {tweets}
                    </ul>
                </div>
            </div>
        );
    }
}

export default TwitterList;