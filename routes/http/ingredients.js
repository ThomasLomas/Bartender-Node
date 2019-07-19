const express = require('express')
const router = express.Router()
const { IngredientsListRequest } = require('../socket');
const ObjectID = require('bson-objectid');

router.post('/', (req, res) => {
    req.logger.info(`Received new ingredient POST request`);
    const existsCheck = req.db.read().get('ingredients').find({ name: req.body.name }).value();
    
    if(!existsCheck) {
        req.body._id = ObjectID();
        req.db.get('ingredients').push(req.body).write();
    }

    // Send a fresh ingredients list down to all clients
    new IngredientsListRequest(req.io, req.io);

    res.json({ success: true });
});

router.delete('/:id', (req, res) => {
    req.logger.info(`Received new ingredient DELETE request for ${req.params.id}`);
    const existsCheck = req.db.read().get('ingredients').find({ _id: req.params.id }).value();

    if(existsCheck) {
        req.db.get('ingredients').remove({ _id: req.params.id }).write();
        req.logger.info(`${req.params.id} removed`);
    } else {
        req.logger.info(`${req.params.id} not found`);
    }

    // Send a fresh ingredients list down to all clients
    new IngredientsListRequest(req.io, req.io);

    res.json({ success: true });
});


module.exports = router;