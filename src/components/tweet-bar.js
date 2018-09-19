import React from 'react';

const TweetBar = (props) => {
    // debugger;
    // console.log(props.info);
    return (
        <div>
            <p>{props.info.title}</p>
        </div>
    );
}

export default TweetBar;