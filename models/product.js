// models/product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Warehouse = require('./warehouse');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  warehouse_ids: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    references: {
      model: Warehouse,
      key: 'id',
    },
  },
});

module.exports = Product;
