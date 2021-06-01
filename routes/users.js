const express = require('express');
const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/users_controllers');

router.get('/profile',passport.checkAuthentication,userController.user);

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);



router.post('/create' , userController.create);

router.post('/session',passport.authenticate('local',{
    failureRedirect:'/users/sign-in'
}),userController.createSession);

router.get('/sign-out',userController.destroySession);


module.exports = router;