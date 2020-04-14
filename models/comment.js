module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define(
        "Comment",
        {
            // eslint-disable-next-line camelcase
            comment_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            comment: {
                type: DataTypes.STRING,
                allowNull: false
            },

            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    isDate: true,
                    isAfter: "2020-03-01",
                    isBefore: "2020-09-30"
                }
            },

            team: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                    len: [5, 75]
                }
            }
        },
        {
            timestamps: false
        }
    );
    return Comment;
};