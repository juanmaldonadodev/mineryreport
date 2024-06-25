// models/delivery.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Warehouse = require('./warehouse');

const Delivery = sequelize.define('Delivery', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  product_ids: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  lat: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  lon: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  delivery_date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  warehouse_id: {
    type: DataTypes.STRING,
    references: {
      model: Warehouse,
      key: 'id',
    },
  },
});

module.exports = Delivery;
