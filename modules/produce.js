const db = require('../db');
const logger = require('../logger');
const pumps = require('./pumps');
const lights = require('./lights');
class Produce {
    constructor() {
        this.reset();
    }

    statusObject() {
        return {
            status: this.status,
            recipe: this.recipe,
            progressPct: this.progressPct,
            amountIngredients: this.amountIngredients,
            amountIngredientsComplete: this.amountIngredientsComplete
        };
    }

    reset() {
        this.status = 'ready';
        this.recipe = '';
        this.amountIngredients = 0;
        this.amountIngredientsComplete = 0;
        this.progressPct = 0;
    }

    sendStatusUpdate(io) {
        io.send({
            type: 'Status',
            data: this.statusObject()
        });
    }

    produce(recipeId, io) {
        if(this.status !== 'ready') {
            logger.info('Already producing something');
            return false;
        }

        const recipe = db.get('recipes').find({ _id: recipeId }).value();
        const pumpsConfig = db.get('pumps');

        if (!recipe) {
            logger.info(`Could not find ${recipeId}`);
            return false;
        }

        logger.info(`Producing a recipe ${recipe.name} with id ${recipeId}`);

        // Set status
        this.status = 'producing';
        this.recipe = recipe.name;

        // Hold all promises so we know when we are done
        const promises = [];

        Object.keys(recipe.ingredients).forEach(ingredientId => {
            const time = (recipe.ingredients[ingredientId] * 1.2) * 1000;

            // Get the pump with the ingredient assigned to it
            const pump = pumpsConfig.find({ value: ingredientId }).value();

            // No pump with this ingredient - skip it I guess
            if (pump) {
                this.amountIngredients++;
                promises.push(
                    pumps.on(pump.pin, time).then(() => {
                        // This ingredient has completed pouring
                        this.amountIngredientsComplete++;
                        this.progressPct = Math.ceil((this.amountIngredientsComplete / this.amountIngredients) * 100);
                        this.sendStatusUpdate(io);
                    })
                );
            }
        });

        this.sendStatusUpdate(io);
        
        Promise.all(promises).then(() => {
            logger.info(`Completed a recipe ${recipe.name} with id ${recipeId}`);
            // All drinks are complete
            this.status = 'collect';
            lights.ready();
            this.sendStatusUpdate(io);
        }).delay(10 * 1000).then(() => { // Give it 10 seconds before readying back up
            this.reset();
            lights.startChase();
            this.sendStatusUpdate(io);
        });
    }
}

module.exports = new Produce();