const express = require("express");
const app = express();
const player = require("./playerRoutes");
const game = require("./matchRoutes");
const team = require("./teamRoutes");
const user = require("./userRoutes");

app.use("/player", player);
app.use("/team", team);
app.use("/game", game);
app.use("/user", user);

module.exports = app;
