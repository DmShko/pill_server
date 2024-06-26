const express = require('express');
const cors = require('cors');
// const logger = require('morgan'); //print information about request to console
// search .env

// add data to environment variebles from .env file
require('dotenv').config();

// import routers
const pillsRouter = require('./routes/api/pills');
const authRouter = require('./routes/api/auth');
const statisticRouter = require('./routes/api/statistic');
const descriptionRouter = require('./routes/api/description');

// create server 'pills'
const pills = express();

//print information about request to console
// const formatsLogger = pills.get("env") === "development" ? "dev" : "short";

//print information about request to console
// pills.use(logger(formatsLogger));

pills.use(cors());
pills.use(express.json());
pills.use(express.static('public'));

//on each get typeof '/api/pills' go to 'pillsRouter'
pills.use('/api/auth', authRouter);
pills.use('/api/pills', pillsRouter);
pills.use('/api/statistic', statisticRouter);
pills.use('/api/description', descriptionRouter);

pills.use((req, res) => {
    res.status(404).json({message: 'Not found'});
});

// universal error hundler
pills.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({
      message,
    });
});
  
// export 'temp_map' veb-server
module.exports = pills;