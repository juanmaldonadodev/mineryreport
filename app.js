const express = require('express');
const app = express();
const routes = require('./routes');
const sequelize = require('./config/database');

app.use(express.json());
app.use('/api', routes);

const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
