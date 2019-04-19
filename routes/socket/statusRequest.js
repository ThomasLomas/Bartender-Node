const logger = require('../../logger');

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
            data: {
                status: 'producing',
                recipe: 'Cool drink',
                ingredient: 'orange',
                progressPct: 75 
            }
        });
    }
};
