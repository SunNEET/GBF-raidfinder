import React from 'react';

const TweetBar = (props) => {
    // debugger;
    // console.log(props.info);
    return (
        <div className="gbfrf-column__header-name">
            {props.info.title}
        </div>
    );
}

export default TweetBar;