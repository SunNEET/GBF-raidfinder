import React from 'react';

const TweetBar = (props) => {

    const title = props.info.title;
    const subtitle = props.info.subtitle;

    return (
        <div className="mdl-layout__header-row gbfrf-column__header-row">
            <div className="mdl-layout-title gbfrf-column__header">
                <div className="gbfrf-column__header-name">
                    {title}
                </div>
                <div className="gbfrf-column__header-translatedName">
                    {subtitle}
                </div>
            </div>
            <div className="mdl-layout-spacer"></div>
            <i className="material-icons" onClick={() => props.remove(title)} >clear</i>
        </div>
    );
}

export default TweetBar;