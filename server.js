const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const Ask = require('./lib/input');
const ask = new Ask();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();

sequelize.sync({ force: false }).then(() => {
    console.log('Connected to the database.');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        ask.init();
    });
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});