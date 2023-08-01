const express = require('express');
const app = express();
const cors = require('cors');
const Routes = require('./Routes/Api'); // No need for .js extension
const DB = require('./Database/Db'); // No need for .js extension
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/', Routes);
DB(); // Call the DB function to establish the database connection

app.listen(port, () => {
  console.log(`Server Ready: http://localhost:${port}`);
});
