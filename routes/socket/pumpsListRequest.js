const logger = require('../../logger');
const db = require('../../db');

/**
 * Used for getting the Pumps
 */
module.exports = class PumpsListRequest {
    constructor(io, socket) {
        this.invoke(io, socket);    
    }

    invoke(io, socket) {
        logger.info('Received a PumpsListRequest');

        const pumps = JSON.parse(JSON.stringify(db.get('pumps').value())).map(pump => {
            if(pump.value) {
                pump.ingredient = db.get('ingredients').find({ _id: pump.value }).value().name;
            } else {
                pump.ingredient = 'Not mapped';
            }

            return pump;
        });

        socket.send({
            type: 'PumpsList',
            data: {
                pumps
            }
        });
    }
};
