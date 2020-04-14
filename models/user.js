// var crypto = require("crypto");
var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          len: [5, 75]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        len: [8, 20]
      },
      coach: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      team: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    },
    {
      timestamps: false
    }
  );

  //generate hash
  User.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSalt(12), null);
  };
  
  //pass validation
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.passwordInput);
  };
 
  return User;
};
// };
