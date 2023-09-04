const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    tag_name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    // define columns
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);
const Product = require('./Product');
const ProductTag = require('./ProductTag');

Tag.belongsToMany(Product, { through: ProductTag });

module.exports = Tag;
