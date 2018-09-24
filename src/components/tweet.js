import React from 'react';
/*
* This is the child tweet component representing a single row
*/
const TweetComponent = (props) => {
    console.log(props.tweet);
    const tweet = props.tweet;
    const username = tweet.user.screen_name;

    const RaidRegexJapanese = new RegExp('(.*?)([0-9A-F]{8}) :参戦ID\n参加者募集！\n(.+)\n?(.*)', 'g');
    const RaidRegexEnglish = new RegExp('(.*?)([0-9A-F]{8}) :Battle ID\nI need backup!\n(.+)\n?(.*)', 'g');
    var arrJP = RaidRegexJapanese.exec(tweet.text);
    var arrENG = RaidRegexEnglish.exec(tweet.text);
    var roomID;
    if(arrJP){
        roomID = arrJP[2];
    } else if(arrENG) {
        roomID = arrENG[2];
    }

    /* 時間功能頗複雜, 日後再處理
    // var time = tweet.created_at;
    // time = time.split(' ');
    // const f_time = new Date(`${time[1]} ${time[2]}, ${time[5]} ${time[3]}`);
    // const d = new Date();
    // console.log(f_time);
    // YYYY-MM-DDTHH:mm:ss.sssZ
    // var date1 = new Date('Dec 17, 1995 13:24:20');
    //  ["Sun", "Sep", "23", "23:34:50", "+0000", "2018"]
    */
    return (
        <li className="gbfrf-tweet gbfrf-js-tweet mdl-list__item">
            <div className="mdl-list__item-primary-content">
                <img className="gbfrf-tweet__avat4ar" src={tweet.user.profile_image_url}/>
                <div className="gbfrf-tweet__content">
                    <div>
                        <span className="gbfrf-tweet__username">{username}</span>
                        <span className="gbfrf-tweet__timestamp"></span>
                    </div>
                </div>
            </div>
            <div className="gbfrf-tweet__raid-id">
                {roomID}
            </div>
        </li>
    );
}

export default TweetComponent;