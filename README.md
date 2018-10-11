# NepuFriends
[NepuFriends](https://nepu-friends-2.herokuapp.com/) is a site for finding [Granblue Fantasy](http://granbluefantasy.jp/) raid tweets. I took [GBF-raidfinders](https://github.com/walfie/gbf-raidfinder)'s MDL style interface as reference, **rebuilding it from scratch with React, Node, Express and Socket.io**, adding more useful functionality to it.

## Feature
In addition to [the feature of walfie's version](https://github.com/walfie/gbf-raidfinder#features), I added some new stuff.

- **1-CLICK JOIN**
![Viramte](https://github.com/SunNEET/GBF-raidfinder/blob/master/demo-viramate.gif)
To enable the functionality, you need to have a chrome extension, Viramate, installed, and check this option off.
![fig1](https://i.imgur.com/1akpy5l.png)

## Development progress

### Twitter Streamming API and Socket.io
- [x] Receive streaming data from Twitter (server.js)
- [x] Attach the data to client-side (App.js)

### Component Design
- [x] Build a tweet component to display tweet content
  - [x] Display roomID, profileImg, twitterID and message
  - [x] Click and copy the content
  - [x] Display notification when copying
  - [x] **Use Viramate API to control the game directly between browser windows**
  - [ ] _Display how long after the tweet has posted (quite complicated - put off to phase2)_
- [ ] Build a list component
  - [x] Put tweets into it
  - [x] Remove button
  - [ ] Drag and drop interface
- [x] Build a container to put mutliple tweet list into it
- [x] Build a add button to open config page
- [x] Build a config page
  - [x] Display a list of bosses
  - [x] Click a boss item and then add a new tweetlist to a container
  - [x] Complete regular boss lists 
  - [x] Sort the lists by Level, alphabet order
  - [x] Catalog bosses by their tier or events
  - [ ] _Add new story/guild war event boss to the list automatically(phase2)_

## WARNING TO FIX
- [x] Cancel all subscriptions and asynchronous tasks in the componentWillUnmount method. (TweeterFeed.js)
