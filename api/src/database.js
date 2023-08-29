const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize(
  "postgres://ligafutbol_user:of6QzXOhBGrk5g9DlAbGG1A5JckHRGWy@dpg-cjn2h5kdfrcc73dne9gg-a.oregon-postgres.render.com/ligafutbol?ssl=true"
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
