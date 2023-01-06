import express from "express";
import cors from "cors";
import PORT from "./constants/PORT.js";

const server = express();
server.use(cors());
server.use(express.json());

const userList = [];
const tweetList = [];
const MAX_TWEETS = 10;


server.post("/sign-up", (request, response) => {
  const newUserData = request.body;
  userList.push(newUserData);
  response.send(newUserData);
  console.log("OK");
});

server.post("/tweets", (request, response) => {
  const newTweet = request.body;
  const avatar = userList.find(u=>newTweet.username===u.username).avatar;
  tweetList.push({...newTweet, avatar});
  response.send(newTweet);
  console.log("OK");
});
server.get("/tweets", (request, response) => {
  const lastTweets = [...tweetList].reverse();
  if(lastTweets.length<=MAX_TWEETS){
    response.send(lastTweets);
  }else{
    const firstTweetIndex = 0;
    const lastTweetIndex = 10;
    response.send(lastTweets.slice(firstTweetIndex, lastTweetIndex));
  }
});
server.listen(PORT, () => {
  console.log(`Você está na porta: ${PORT}`);
});
