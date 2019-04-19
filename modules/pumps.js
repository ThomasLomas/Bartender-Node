const config = require('../config');
const logger = require('../logger');

try {
    var gpio = require('rpi-gpio')
    var gpiop = gpio.promise;
} catch (er) {
    var gpio = {
        setMode: () => {}
    };
    var gpiop = {
        setup: () => {},
        write: () => {}
    };
}

class Pumps {
    constructor() {
        gpio.setMode(gpio.MODE_BCM);
    }

    setup() {
        return Promise.map(config.pumps, (pump) => {
            logger.info(`Setting up ${pump.name}`);
            return gpiop.setup(pump.pin, gpio.DIR_HIGH);
        }).then(() => {
            logger.info('All pumps setup'); 
        });
    }

    off(pumpPin) {
        return gpiop.write(pumpPin, true).then(() => {
            logger.info(`${pumpPin} Toggled Off`);
        });
    }
    
    on(pumpPin, time) {
        return gpiop.write(pumpPin, false).then(() => {
            logger.info(`${pumpPin} Toggled On for ${time}ms`);
        }).delay(time).then(() => this.off(pumpPin));
    }
}

module.exports = new Pumps();

