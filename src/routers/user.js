const express = require('express');
const router = new express.Router();
const db = require('../DB/mockDB').getInstance();

// Mock controller 

const BASE_URL = '/users';


router.post(BASE_URL, async(req, res) => {
    try {
        let newUser = db.saveUser(req.body)
        res.status(201).send(newUser)
    } catch(err) {
        console.error(err);
        res.status(400).send(err)
    }

})


router.get(BASE_URL+'/:userId?', async(req, res) => {
    try {
        let user = db.getUserById(req.params.userId)
        res.status(200).send(user)
    } catch(err) {
        console.error(err);
        res.status(400).send(err)
    }
})

router.get(BASE_URL+'/search/:userName?', async(req, res) => {
    try {
        let user = db.getUserByName(req.params.userName)
        res.status(200).send(user)
    } catch(err) {
        console.error(err);
        res.status(400).send(err)
    }
})


module.exports = router;