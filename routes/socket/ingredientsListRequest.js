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
        logger.info('Received a IngredientsListRequest');
        socket.send({
            type: 'IngredientsList',
            data: {
                ingredients: db.get('ingredients') 
            }
        });
    }
};
