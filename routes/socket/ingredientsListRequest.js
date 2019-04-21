const logger = require('../../logger');
const db = require('../../db');

/**
 * Used for getting the list of ingredients
 */
module.exports = class IngredientsListRequest {
    constructor(io, socket) {
        this.invoke(io, socket);    
    }

    invoke(io, socket) {
        // Debug :)
        // require('../../modules/produce').produce('5cbce18e9ed332427cb201fe', io);

        logger.info('Received a IngredientsListRequest');
        socket.send({
            type: 'IngredientsList',
            data: {
                ingredients: db.get('ingredients') 
            }
        });
    }
};
