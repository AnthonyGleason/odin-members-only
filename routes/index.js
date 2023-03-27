var express = require('express');
const passport = require('passport');
var router = express.Router();
const {createUser,getUser,getAllUsers,updateUser,deleteUser,getUserByDocID} = require('../controllers/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()){
    res.render('signedIn');
  }else{
    res.render('notSignedIn');
  }
});

//login
router.get('/login', function (req,res,next){
  res.render('login');
});
router.post('/login',passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

//logout
router.post('/logout', function (req,res,next){
  req.logout((err)=>{
    if (err) console.log(err);
  });
  //redirect the user to home
  res.redirect('/');
})

//signup
router.get('/signup', function(req,res,next){
  res.render('signup');
})
router.post('/signup',async function(req,res,next){
  const user = await createUser(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password,
    'Member',
  );
})

//export router
module.exports = router;