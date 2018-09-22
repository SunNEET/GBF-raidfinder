import React from 'react';

const TweetBar = (props) => {
    // debugger;
    const title = props.info.title;
    const subtitle = props.info.subtitle;
    console.log(props);
    console.log(props.info.title);

    const remove = () => {
        props.remove(title);
    };

    return (
        <div className="mdl-layout__header-row gbfrf-column__header-row">
            <div className="mdl-layout-title gbfrf-column__header">
                <div className="gbfrf-column__header-name">
                    {props.info.title}
                </div>
                <div className="gbfrf-column__header-translatedName">
                    {/* {props.infod.subtitle} */}
                    English Name
                </div>
            </div>
            <div className="mdl-layout-spacer"></div>
            <i className="material-icons" onClick={remove} >clear</i>
        </div>
    );
}

export default TweetBar;