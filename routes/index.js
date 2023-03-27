var express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
var router = express.Router();
const {createUser,getUser,getAllUsers,updateUser,deleteUser,getUserByDocID} = require('../controllers/User');
const { createMessage, getAllMessages } = require('../controllers/Message');

/* GET home page. */
router.get('/', async function(req, res, next) {
  //get all messages
  const messages = await getAllMessages();
  console.log(messages);
  //check if user is authenticated and render message route
  if (req.isAuthenticated()){
    res.render('signedIn', {messages: messages});
  }else{
    res.render('notSignedIn', {messages: messages});
  }
});

//login
router.get('/login', function (req,res,next){
  res.render('login');
});
//sends the username and password inputs to the passport.authenticate middleware
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
  //passwords don't match
  if (req.body.password!==req.body.passwordConfirm){
    return res.status(400).json({ err: 'passwords do not match'});
  };
  //user already exists
  const userExists = await getUser(req.body.email);
  if (userExists){
    return res.status(400).json({ err: 'user exists in database'});
  }
  //make a new user
  const user = await createUser(
    req.body.firstName,//first name
    req.body.lastName, //last name
    req.body.email, //email || username
    await bcrypt.hash(req.body.password,10), //hash password
    'Registered', //member status
  );
  res.redirect('/'); //redirect user to home after sign up
})

//join the club
router.get('/jointheclub',(req,res,next)=>{
  res.render('joinTheClub');
});

router.post('/jointheclub',async (req,res,next)=>{
  const clubPass = 'cats';
  let tempUser = req.user
  if (req.body.pass!==clubPass){
    return res.status(400).json({err: 'club password is incorrect!'});
  }
  if (req.body.pass===clubPass){
    tempUser.memberStatus='Member';
    await updateUser(tempUser.userName,tempUser);
    res.redirect('/');
  }
});

//new message
router.get('/newmessage',(req,res,next)=>{
  res.render('newMessage');
});

router.post('/newmessage',async (req,res,next)=>{
  //check if a user is signed in
  if (!req.user) return res.status(400).json({err: 'you must be signed in to create a message'});
  //check if a user is not a member
  if (req.user.memberStatus!=='Member') return res.status(400).json({err: 'only club members can create new messages!'});
  //create message
  await createMessage(
    req.body.title,//title
    Date.now(),//timestamp
    req.body.text,//message content
    req.user.userName//created by
  )
  res.redirect('/');
});
//export router
module.exports = router;