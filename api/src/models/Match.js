const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Match", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    day: {
      type: DataTypes.STRING,
    },
    hour: {
      type: DataTypes.STRING,
    },
    place: {
      type: DataTypes.STRING,
    },
    placeLink: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("Active", "Finished"),
      defaultValue: "Active",
    },
  });
};
