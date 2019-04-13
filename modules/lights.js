const dotstar = require('dotstar');
const SPI = require('pi-spi');
const config = require('../config');

const spi = SPI.initialize(config.lights.path);

const ledStrip = new dotstar.Dotstar(spi, {
	  length: config.lights.stripLength
});

ledStrip.clear();
ledStrip.sync();

module.exports = {
    clear: () => {
        ledStrip.clear();
        ledStrip.sync();
    }
};

for(var i = 0; i <= 22; i++) {
//	ledStrip.set(i, 244, 66, 191, 0.8);
}
//ledStrip.all(0, 252, 8, 0.8);
