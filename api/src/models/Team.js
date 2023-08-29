const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Team", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gamesPlayed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    wins: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    tie: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    lose: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  });
};
