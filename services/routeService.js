// services/routeService.js
const Delivery = require('../models/delivery');
const Warehouse = require('../models/warehouse');

exports.calculateRoute = async (deliveryIds) => {
  const deliveries = await Delivery.findAll({ where: { id: deliveryIds } });

  if (deliveries.length === 0) {
    throw new Error('No deliveries found for the given IDs');
  }

  // Group deliveries by warehouse
  const warehouseDeliveries = {};
  for (const delivery of deliveries) {
    if (!warehouseDeliveries[delivery.warehouse_id]) {
      warehouseDeliveries[delivery.warehouse_id] = [];
    }
    warehouseDeliveries[delivery.warehouse_id].push(delivery);
  }

  // Calculate waypoints based on the grouped deliveries
  const waypoints = [];
  let totalDistance = 0;

  for (const warehouseId in warehouseDeliveries) {
    const warehouse = await Warehouse.findByPk(warehouseId);
    waypoints.push({ lat: warehouse.lat, lon: warehouse.lon });

    for (const delivery of warehouseDeliveries[warehouseId]) {
      waypoints.push({ lat: delivery.lat, lon: delivery.lon });
      totalDistance += calculateDistance(warehouse.lat, warehouse.lon, delivery.lat, delivery.lon);
    }

    // Return to the warehouse
    waypoints.push({ lat: warehouse.lat, lon: warehouse.lon });
    totalDistance += calculateDistance(warehouse.lat, warehouse.lon, waypoints[waypoints.length - 2].lat, waypoints[waypoints.length - 2].lon);
  }

  return {
    route: waypoints,
    distance: totalDistance,
  };
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
