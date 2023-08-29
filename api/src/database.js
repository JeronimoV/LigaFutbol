const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const player = require("./models/player");

const sequelize = new Sequelize(
  "postgres://postgres:paj@erovich@localhost:5432/ligatuma"
);

const modelList = [];
const pathModelsFiles = [];
const requires = [];

const pathModels = path.join(__dirname, "models");
const models = fs.readdirSync(pathModels);
models.forEach((value) => modelList.push(value));
modelList.forEach((value) =>
  pathModelsFiles.push(path.join(__dirname, "/models", value))
);
pathModelsFiles.forEach((value) => requires.push(require(value)));
requires.forEach((value) => value(sequelize));

const { Player, Team, Match } = sequelize.models;

Player.belongsTo(Team);
Team.hasMany(Player);

Team.belongsToMany(Team, {
  through: Match,
  as: "TeamMatch",
  foreignKey: "FirstTeamId",
  otherKey: "SecondTeamId",
});

Match.belongsTo(Team, {
  as: "FirstTeam",
  foreignKey: "FirstTeamId",
});

Match.belongsTo(Team, {
  as: "SecondTeam",
  foreignKey: "SecondTeamId",
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
