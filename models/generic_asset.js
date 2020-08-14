/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('generic_asset', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    type: {
      type: 'SET(\'PRODUCTIVE','ENTERTAINING','RAW','INFORMATION','SYMBOLIC','ASSURING','OTHER')',
      allowNull: false
    },
    ephemeral: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 1
    },
    expiration: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: "838:59:59",
      comment: 'delta time between creation date and expiration date. expressed in Time type'
    },
    atomic: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 0
    },
    valuable_exchange: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 1
    },
    unicode: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    media: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'generic_asset'
  });
};
