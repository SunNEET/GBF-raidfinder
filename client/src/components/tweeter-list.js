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
        this.setState({
            tweets: [tweet].concat(this.state.tweets)
        });
    }

    componentDidMount(){
        this.props.tweetApp.tweetStream((tweet) => {
            if(_.includes(tweet.text, this.props.target.title)||_.includes(tweet.text, this.props.target.subtitle)){
                this.addTweet(tweet);
            }
        })
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