import React, {Component} from 'react';
import _ from 'lodash';
import TweeterList from './tweeter-list';
import TweetBar from './tweet-bar';
import {Row, Col} from 'reactstrap';

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
        tweets = _.take(tweets, 20);
        this.setState({
            tweets: tweets
        });
    }

    // This is a react function that is call right before the component
    // is added to the DOM
    componentWillMount() {
        // debugger;
        // console.log(this.props.tweetApp);
        this.props.tweetApp.tweetStream( (tweet) => {
            this.addTweet(tweet);
        } )
    }
    
    render() {
        return(
            <div>
                <Row>
                    <Col md="4">
                        <TweetBar info={this.props.info}/>
                        <TweeterList tweets={this.state.tweets}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default TweeterFeed;