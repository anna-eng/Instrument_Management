const express = require('express');
const router = new express.Router();
const Instrument = require('../model/Instrument');
const db = require('../DB/mockDB').getInstance();

const BASE_URL = '/users/:userId/instruments';

router.get(BASE_URL, async(req, res) => {
    try {
        let instruments = db.getUserById(req.params.userId).instruments
        res.status(200).send(instruments);
    } catch(err) {
        console.error(err);
        res.status(400).send(err)
    }
})
router.post(BASE_URL, async(req, res) => {
    try {
        let user = db.getUserById(req.params.userId);
        let newInstrument = new Instrument(req.body)
        user.addInstrument(newInstrument);
        db.saveUser(user);
        res.status(201).send(newInstrument);
    } catch(err) {
        console.error(err);
        res.status(400).send(err);
    }
})

router.delete(BASE_URL+ '/:instrumentId', async(req, res) => {
    try {
        let user = db.getUserById(req.params.userId);
        user.deleteInstrument(req.params.instrumentId);
        db.saveUser(user);
        res.status(200).send(user.instruments)
    } catch(err) {
        console.error(err);
        res.status(400).send(err);
    }

})

module.exports = router;