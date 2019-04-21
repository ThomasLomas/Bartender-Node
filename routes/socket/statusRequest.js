const logger = require('../../logger');
const produce = require('../../modules/produce');

/**
 * Used for getting the production status
 */
module.exports = class StatusRequest {
    constructor(io, socket) {
        this.invoke(io, socket);    
    }

    invoke(io, socket) {
        logger.info('Received a StatusRequest');
        socket.send({
            type: 'Status',
            data: produce.statusObject()
        });
    }
};
