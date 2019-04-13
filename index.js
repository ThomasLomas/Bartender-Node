const path = require('path');
const config = require('./config');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const winston = require('winston');

const lights = require('./modules/lights');

const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `[${timestamp}] [${level}] ${message}`;
});

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
    	myFormat
  	),
    transports: [
        new winston.transports.Console(),
    ]
});


app.use((req, res, next) => {
    req.logger = logger;
    req.lights = lights;
    next();
});

app.use(express.static(path.join(__dirname, 'client', 'dist', 'bartender')));

server.listen(config.http.port, () => {
    logger.info(`Server started on ${config.http.port}`);
});

