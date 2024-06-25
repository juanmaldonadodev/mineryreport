// controllers/deliveryController.js
const { Sequelize } = require('sequelize');
const Delivery = require('../models/delivery');
const Product = require('../models/product');
const Warehouse = require('../models/warehouse');
const sequelize = require('../config/database');

exports.createDelivery = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { product_ids, lat, lon, delivery_date } = req.body;

    // Find warehouses that contain all the required products
    const warehouses = await Warehouse.findAll({ transaction });
    let selectedWarehouse = null;
    for (const warehouse of warehouses) {
      const products = await Product.findAll({
        where: {
          id: product_ids,
          warehouse_ids: {
            [Sequelize.Op.contains]: [warehouse.id],
          },
        },
        transaction,
      });

      if (products.length === product_ids.length) {
        selectedWarehouse = warehouse;
        break;
      }
    }

    if (!selectedWarehouse) {
      await transaction.rollback();
      return res.status(400).json({ error: 'No single warehouse contains all the required products' });
    }

    const delivery = await Delivery.create({
      product_ids,
      lat,
      lon,
      delivery_date,
      warehouse_id: selectedWarehouse.id,
    }, { transaction });

    await transaction.commit();
    res.status(201).json(delivery);
  } catch (error) {
    await transaction.rollback();
    res.status(400).json({ error: error.message });
  }
};
