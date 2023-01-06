import express from "express";
import cors from "cors";
import PORT from "./constants/PORT.js";

const server = express();
server.use(cors());
server.use(express.json());

const userList = [];
const tweetList = [];

server.post("/sign-up", (request, response) => {
  const newUserData = request.body;
  userList.push(newUserData);
  console.log(userList)
  console.log("OK");
});

server.post("/tweets", (request, response) => {
  const newTweet = request.body;
  tweetList.push(newTweet);
  console.log("OK");
});
server.get("/tweets", (request, response) => {
  const lastTweetIndex = tweetList.length-1;
  let counter = 0;
  const lastTenTweets = [];
  while(counter<10){
    lastTenTweets.push(tweetList[lastTweetIndex-counter]);
    counter++;
  }
  console.log(lastTenTweets);
  response.send(lastTenTweets);
});
server.listen(PORT, () => {
  console.log(`Você está na porta: ${PORT}`);
});
