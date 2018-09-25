import React from 'react';
import copy from 'copy-to-clipboard';

const TweetComponent = (props) => {
    const tweet = props.tweet;
    const username = tweet.user.screen_name;
    const userpic = tweet.user.profile_image_url;
    const RaidRegexJapanese = new RegExp('(.*?)([0-9A-F]{8}) :参戦ID\n参加者募集！\n(.+)\n?(.*)', 'g');
    const RaidRegexEnglish = new RegExp('(.*?)([0-9A-F]{8}) :Battle ID\nI need backup!\n(.+)\n?(.*)', 'g');
    const arrJP = RaidRegexJapanese.exec(tweet.text);
    const arrENG = RaidRegexEnglish.exec(tweet.text);
    var roomID, msg="";
    if(arrJP){
        roomID = arrJP[2];
        msg = arrJP[1];
    } else if(arrENG) {
        roomID = arrENG[2];
        msg = arrENG[1]
    }

    /* 時間功能頗複雜, 日後再處理... 
    (1) Twitter時間格式和Date格式的處理 
    (2) 每過一分鐘所有元件的 xxx ago 都要更新
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
        // gbfrf-tweet--copied 當點擊複製後加上這個class
        <li className="gbfrf-tweet gbfrf-js-tweet mdl-list__item" 
            onClick={()=>{
                copy(roomID);
                props.showAria(roomID);
                props.tryJoinRaid(roomID);}}>
            <div className="mdl-list__item-primary-content">
                <img className="gbfrf-tweet__avatar" src={userpic}/>
                <div className="gbfrf-tweet__content">
                    <div>
                        <span className="gbfrf-tweet__username">{username}</span>
                        <span className="gbfrf-tweet__timestamp"></span>
                    </div>
                    {msg ? <div className="gbfrf-tweet__text mdl-shadow--2dp">{msg}</div> : null}
                </div>
            </div>
            <div className="gbfrf-tweet__raid-id">
                {roomID}
            </div>
        </li>
    );
}

export default TweetComponent;