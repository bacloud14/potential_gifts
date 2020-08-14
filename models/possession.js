/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('possession', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    user: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: {
          tableName: 'user',
        },
        key: 'id'
      }
    },
    asset: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: {
          tableName: 'assets',
        },
        key: 'id'
      }
    },
    time: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'possession'
  });
};
