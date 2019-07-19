const logger = require('../../logger');
const produce = require('../../modules/produce');
const db = require('../../db');

/**
 * Used for getting the recipes
 */
module.exports = class RecipesListRequest {
    constructor(io, socket) {
        this.invoke(io, socket);    
    }

    invoke(io, socket) {
        logger.info('Received a RecipesListRequest');

        // Some reason lowdb would hold references on filters...
        const recipes = JSON.parse(JSON.stringify(db.get('recipes').value())).filter(recipe => {
            let hasAllIngredients = true;
            
            Object.keys(recipe.ingredients).forEach(ingredientId => {
                const ingredientPump = db.get('pumps').find({ value: ingredientId }).value();

                if (!ingredientPump) {
                    hasAllIngredients = false;
                }
            });

            return hasAllIngredients;
        }).map(recipe => {
            recipe.ingredients = Object.keys(recipe.ingredients).map(ingredientId => {
                return db.get('ingredients').find({ _id: ingredientId }).value();
            });

            return recipe;
        });

        socket.send({
            type: 'RecipesList',
            data: {
                recipes
            }
        });
    }
};
