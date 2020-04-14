module.exports = function (sequelize, DataTypes) {
  var Game = sequelize.define(
    "Game",
    {
      game_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      in_progress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isAfter: "2020-03-01",
          isBefore: "2020-09-30",
        },
      },
      home_team: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      away_team: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
    },
    {
      timestamps: false,
    }
  );
  return Game;
};