const config = require('../config');

try {
    const dotstar = require('dotstar');
    const SPI = require('pi-spi');

    const spi = SPI.initialize(config.lights.path);
    var ledStrip = new dotstar.Dotstar(spi, {
        length: config.lights.stripLength
    });
} catch (er) {
    var ledStrip = {
        clear: () => {},
        sync: () => {},
        set: () => {}
    };
}

class Lights {
    constructor() {
        this.clear();
    }

    clear() {
        if (this.chaseInt) { clearInterval(this.chaseInt); }
        if (this.readyInt) { clearInterval(this.readyInt); }
        
        ledStrip.clear();
        ledStrip.sync();
    }
    
    ready() {
        if (this.chaseInt) { clearInterval(this.chaseInt); }
        if (this.readyInt) { clearInterval(this.readyInt); }

        ledStrip.clear();
        let opacity = 0;
        let dir = 'f';

        this.readyInt = setInterval(() => {
            if(dir === 'f') {
                opacity += 1;
            } else {
                opacity -= 1;
            }

            for(var i = 0; i <= config.lights.actualLength; i++) {
                ledStrip.set(i, 0, 255, 0, opacity / 40);
            }
            ledStrip.sync();

            if(opacity === 40) {
                dir = 'b';
            } else if(opacity === 3) {
                dir = 'f';
            }
        }, 25);
    }

    startChase() {
        ledStrip.clear();
        let currentPoint = 0;
        let lastPoints = [];

        if (this.chaseInt) { clearInterval(this.chaseInt); }
        if (this.readyInt) { clearInterval(this.readyInt); }

        this.chaseInt = setInterval(() => {
            if (lastPoints.length) {
                lastPoints.forEach(point => ledStrip.set(point, 0, 0, 0, 0));
                lastPoints = [];
            }

            const previousPoint = currentPoint - 1;
            const nextPoint = currentPoint + 1;

            if (previousPoint >= 0) {
                lastPoints.push(previousPoint);
                ledStrip.set(previousPoint, 0, 255, 0, .8);
            }

            lastPoints.push(currentPoint);
            ledStrip.set(currentPoint, 255, 0, 0, 1);
            
            if (nextPoint <= config.lights.actualLength) {
                lastPoints.push(nextPoint);
                ledStrip.set(nextPoint, 0, 255, 0, .8);
            }

            ledStrip.sync();
            currentPoint++;

            if (currentPoint == config.lights.actualLength) {
                currentPoint = 0;
            }
        }, 75);
    }
}

module.exports = new Lights();

