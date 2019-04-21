global.Promise = require('bluebird');

// Server requires
const path = require('path');
const config = require('./config');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');
const bodyParser = require('body-parser');

// Custom Modules
const db = require('./db');
const logger = require('./logger');
const lights = require('./modules/lights');
const pumps = require('./modules/pumps');

// Routes
const httpRoutes = require('./routes/http');
const socketRoutes = require('./routes/socket');

// For JSON posting
app.use(cors());
app.use(bodyParser.json());

// Add modules to the req object for easy reference
app.use((req, res, next) => {
    req.logger = logger;
    req.lights = lights;
    req.pumps = pumps;
    req.db = db;
    req.io = io;
    next();
});

// Serve up angular frontend - Could be served via a separate HTTP server
app.use(express.static(path.join(__dirname, 'client', 'dist', 'bartender')));

// Express HTTP Routes
Object.keys(httpRoutes).forEach(routeName => {
    app.use(`/${routeName}`, httpRoutes[routeName]);
});

// Route 404 pages to Angular single page application
app.use('*', (req, res) => { res.sendFile(path.join(__dirname, 'client', 'dist', 'bartender', 'index.html')); });

// Start application
pumps.setup().then(() => {
    server.listen(config.http.port, () => {
        logger.info(`Server started on ${config.http.port}`);
        lights.startChase();
    });

    io.on('connection', (socket) => {
        logger.info(`New client connected ${socket.id}`);

        socket.on('message', (m) => {
            logger.info(`Message received from ${socket.id}: ${JSON.stringify(m)}`);

            // We received a valid type
            // Route to the socket route handler for this request
            if (m.type && socketRoutes[m.type]) {
                logger.info(`Routing message of type ${m.type}`);
                new socketRoutes[m.type](io, socket, m);
            }
        });

        socket.on('disconnect', () => {
            logger.info(`Client disconnected ${socket.id}`);
        });
    });
});

