const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
const connectDatabase = require('./api/db/connectDatabase.js');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

// BACKEND ROUTES
app.get('/api/status', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});
app.use('/api', require('./api/routes/api.route.js'));

// FRONTEND ROUTES (For Vercel Deployment)
app.use(express.static(path.resolve(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, 'client', 'build', 'index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err)
      }
    }
  )
});

const PORT = process.env.PORT || 5000;
connectDatabase().then(() => {
  app.listen(PORT, () => console.log(`🚀 CONNECTED TO PORT => ${PORT}`));
});