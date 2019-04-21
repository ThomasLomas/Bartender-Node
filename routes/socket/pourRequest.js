const logger = require('../../logger');
const produce = require('../../modules/produce');

/**
 * Used for pouring a drink
 */
module.exports = class PourRequest {
    constructor(io, socket, message) {
        this.invoke(io, socket, message);    
    }

    invoke(io, socket, message) {
        logger.info(`Received a PourRequest - ${message.data.recipeId}`);
        produce.produce(message.data.recipeId, io);
        socket.send({
            type: 'Status',
            data: produce.statusObject()
        });
    }
};
