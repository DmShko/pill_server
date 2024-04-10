const express = require('express');
const cors = require('cors');

// import routers
const pillsRouter = require('./routes/api/pills');

// create server 'pills'
const pills = express();

pills.use(cors());
pills.use(express.static('public'));

//on each get typeof '/api/pills' go to 'pillsRouter'
pills.use('/api/pills', pillsRouter);

// universal error hundler
pills.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({
      message,
    });
  });
  
  // export 'temp_map' veb-server
module.exports = pills;