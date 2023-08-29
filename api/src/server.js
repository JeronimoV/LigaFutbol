const app = require("./routes/index");
const express = require("express");
const server = express();
const cors = require("cors");
const { conn } = require("./database");

server.use(express.json());
server.use(cors());

server.use("/", app);

conn
  .sync({ force: false })
  .then(() => {
    server.listen(3001, () => {
      console.log("Server connected");
    });
  })
  .catch((err) => console.log(err));
