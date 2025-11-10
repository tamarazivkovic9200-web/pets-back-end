const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const petRouter= require("./controllers/pets")

const PORT = process.env.PORT || 3000


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(logger('dev'));

// Add the petRouter to the `/pets` route

app.use('/pets', petRouter);



app.listen(PORT, () => {
  console.log(`The express app is ready! $ {PORT}`);
});