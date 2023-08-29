const app = require("express").Router();
const {
  getAllMatchs,
  getMatch,
  createMatch,
  modifyMatch,
  matchResult,
  deleteMatch,
} = require("../controllers/matchControllers");

app.get("/", getAllMatchs);
app.get("/:id", getMatch);
app.post("/create", createMatch);
app.put("/", modifyMatch);
app.put("/result", matchResult);
app.delete("/:id", deleteMatch);

module.exports = app;
