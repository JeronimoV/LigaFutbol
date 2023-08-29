const app = require("express").Router();
const {
  getAllTeams,
  getTeam,
  createTeam,
  modifyTeam,
  modifyTeamPoints,
  deleteTeam,
} = require("../controllers/teamsControllers");

app.get("/", getAllTeams);
app.get("/:id", getTeam);
app.post("/create", createTeam);
app.put("/", modifyTeam);
app.put("/points", modifyTeamPoints);
app.delete("/:name", deleteTeam);

module.exports = app;
