global.Promise = require('bluebird');

// Server requires
const path = require('path');
const config = require('./config');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Custom Modules
const lights = require('./modules/lights');
const pumps = require('./modules/pumps');
const logger = require('./logger');

// Add modules to the req object for easy reference
app.use((req, res, next) => {
    req.logger = logger;
    req.lights = lights;
    req.pumps = pumps;
    next();
});

// Serve up angular frontend - Could be served via a separate HTTP server
app.use(express.static(path.join(__dirname, 'client', 'dist', 'bartender')));

// Start application
server.listen(config.http.port, () => {
    logger.info(`Server started on ${config.http.port}`);
    lights.startChase();
    pumps.setup().then(() => {
//        return Promise.mapSeries(config.pumps, pump => pumps.on(pump.pin, 2000)); 
    });
});

