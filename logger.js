const winston = require('winston');

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


module.exports = logger;
