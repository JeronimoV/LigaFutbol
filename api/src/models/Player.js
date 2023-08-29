const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Player", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    goals: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    assist: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  });
};
