const express = require('express');
const router = express.Router();

const {isAuthenticated} = require('../helpers/auth');


router.get('/chat/add', isAuthenticated, (req,res) =>{
    res.render('chat/mensaje');
});

router.get('/chat', (req,res) =>{
        res.render('chat/mensaje');
});

module.exports = router;
