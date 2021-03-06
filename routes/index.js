const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')

console.log('router loaded');

router.get('/',homeController.home);

router.use('/users' , require('./users'));

router.use('/not' , require('./notification'));

router.use('/post',require('./post'));

router.use('/postss',require('./postcreate'));

module.exports = router;