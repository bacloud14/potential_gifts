/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('assets', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    generic_asset: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: {
          tableName: 'generic_asset',
        },
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'assets'
  });
};
