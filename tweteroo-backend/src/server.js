import express from "express";
import cors from "cors";
import PORT from "./constants/PORT.js";

const server = express();
server.use(cors());

server.listen(PORT, () => {
  console.log(`Você está na porta: ${PORT}`);
});
