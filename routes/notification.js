const express = require('express');

const router = express.Router();

const notController = require('../controllers/notification_controller')

router.get('/notification' , notController.notification);

module.exports = router;