const express = require('express');
const { isValidObjectId } = require('mongoose');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index');
});

//const socket = io();

module.exports = router;    
