import React from 'react';
import TweetComponent from './tweet';
import {ListGroup} from 'reactstrap';

const TwitterList = (props) => {
    // this is a custom function that takes a tweet and 
    // maps it to the child tweet component
    // the key attribute is needed to tell React each unique row
    // so it can update the DOM faster.
    const mapTweets = (tweet) => {
        return (
            <TweetComponent key={tweet.id} tweet={tweet} />
        );
    }

    if (props && props.tweets){
        var tweets = props.tweets.map(mapTweets) || [];
    } else {
        tweets = [];
    }
    
    return (
        <div className="mdl-list gbfrf-tweets">
            <ListGroup>
                {tweets}
            </ListGroup>
        </div>
    )
}

export default TwitterList;