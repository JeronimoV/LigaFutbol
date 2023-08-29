const app = require("express").Router();
const {
  getAllPlayer,
  getAllTeamPlayers,
  getPlayer,
  createPlayer,
  modifyPlayer,
  modifyPlayerGoals,
  deletePlayer,
} = require("../controllers/playerControllers");

app.get("/", getAllPlayer);
app.get("/team/:teamId", getAllTeamPlayers);
app.get("/:name", getPlayer);
app.post("/create", createPlayer);
app.put("/", modifyPlayer);
app.put("/goals", modifyPlayerGoals);
app.delete("/:name", deletePlayer);

module.exports = app;
