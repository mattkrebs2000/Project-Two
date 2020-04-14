module.exports = function (sequelize, DataTypes) {
  var Scores = sequelize.define(
    "Score",
    {
      game_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      h1_score: {
        type: DataTypes.INTEGER,
        validate: {
          max: 20,
        },
      },
      v1_score: {
        type: DataTypes.INTEGER,
        validate: {
          max: 20,
        },
      },
      h2_score: {
        type: DataTypes.INTEGER,
        validate: {
          max: 20,
        },
      },
      v2_score: {
        type: DataTypes.INTEGER,
        validate: {
          max: 20,
        },
      },
      h3_score: {
        type: DataTypes.INTEGER,
        validate: {
          max: 20,
        },
      },
      v3_score: {
        type: DataTypes.INTEGER,
        validate: {
          max: 20,
        },
      },
      h4_score: {
        type: DataTypes.INTEGER,
        validate: {
          max: 20,
        },
      },
      v4_score: {
        type: DataTypes.INTEGER,
        validate: {
          max: 20,
        },
      },
      h5_score: {
        type: DataTypes.INTEGER,
        validate: {
          max: 20,
        },
      },
      v5_score: {
        type: DataTypes.INTEGER,
        validate: {
          max: 20,
        },
      },
      h6_score: {
        type: DataTypes.INTEGER,
        validate: {
          max: 20,
        },
      },
      v6_score: {
        type: DataTypes.INTEGER,
        validate: {
          max: 20,
        },
      },
      h_overtime: {
        type: DataTypes.INTEGER,
      },
      v_overtime: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
  return Scores;
};