import express from "express";
import cors from "cors";
import PORT from "./constants/PORT.js";

const server = express();
server.use(cors());
server.use(express.json());

const userList = [];
const user = {};

server.post("/sign-up", (request, response) => {
  const newUserData = request.body;
  userList.push(newUserData);
  console.log(userList)
  console.log("OK");
});

server.listen(PORT, () => {
  console.log(`Você está na porta: ${PORT}`);
});
