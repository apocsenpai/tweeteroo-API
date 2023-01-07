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
  const { username, avatar } = newUserData;
  if (!username || !avatar || !isString(username) || !isString(avatar)) {
    response.status(400).send(`Todos os campos são obrigatórios!`);
    return;
  }
  userList.push(newUserData);
  response.status(201).send("OK");
});

server.post("/tweets", (request, response) => {
  const { tweet } = request.body;
  const { user: username } = request.headers;
  const newTweet = { username, tweet };

  if (!username || !tweet || !isString(username) || !isString(tweet)) {
    response.status(400).send(`Todos os campos são obrigatórios!`);
    return;
  } else if (!userList.some((u) => u.username === username)) {
    response.status(401).send("Unauthorized");
    return;
  }
  const avatar = userList.find((u) => username === u.username).avatar;
  tweetList.push({ ...newTweet, avatar });
  response.status(201).send("OK");
});
server.get("/tweets", (request, response) => {
  const MAX_TWEETS = 10;
  const page = parseInt(request.query.page);
  if (page < 1 || typeof(page)!=="number") {
    response.status(400).send("Informe uma página válida!");
    return;
  }
  const lastTweets = [...tweetList].reverse();
  if (!page || page === 1) {
    response.send(lastTweets.slice(0, MAX_TWEETS));
  } else {
    const firstTweetIndex = MAX_TWEETS * (page - 1);
    const lastTweetIndex = MAX_TWEETS * page + 1;
    response.send(lastTweets.slice(firstTweetIndex, lastTweetIndex));
  }
});
server.get("/tweets/:userName", (request, response) => {
  const { userName } = request.params;
  const userTweets = tweetList.filter((t) => t.username === userName);
  response.send(userTweets);
});

const isString = (data)=>{
  return typeof(data)==="string";
}

server.listen(PORT, () => {
  console.log(`Você está na porta: ${PORT}`);
});
