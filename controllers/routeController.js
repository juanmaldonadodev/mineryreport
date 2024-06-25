const routeService = require('../services/routeService');

exports.createRoute = async (req, res) => {
  try {
    const { delivery_ids } = req.body;
    const route = await routeService.calculateRoute(delivery_ids);
    res.status(200).json(route);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
