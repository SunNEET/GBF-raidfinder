## Development progress

### Twitter Streamming API and Socket.io
- [x] Receive streaming data from Twitter (server.js)
- [x] Attach the data to client-side (App.js)

### Component Design
- [ ] Build a tweet component to display tweet content
  - [x] Display a content
  - [ ] Click and copy the content
  - [ ] Use Viramate API to control the game directly between browser windows (phase2)
- [ ] Build a list component
  - [x] Put tweets into it
  - [x] Remove button
  - [ ] Drag and drop interface
- [x] Build a container to put mutliple tweet list into it
- [x] Build a add button to open config page
- [ ] Build a config page
  - [x] Display a list of bosses
  - [x] Click a boss item and then add a new tweetlist to a container
  - [ ] Complete boss lists
  - [ ] Sort the lists by Level, alphabet order
  - [ ] Add new story/guild war event boss to the list automatically(phase2) 
- [ ] 

### Tracking System
Didn't decide to use which on yet


## WARNING TO FIX
- [x] Cancel all subscriptions and asynchronous tasks in the componentWillUnmount method. (TweeterFeed.js)
