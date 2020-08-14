/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    seen: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: sequelize.fn('current_timestamp')
    },
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    role: {
      type: 'SET(\'ADMIN','CONTRIBUTOR','USER','')',
      allowNull: false,
      defaultValue: "user"
    }
  }, {
    sequelize,
    tableName: 'user'
  });
};
