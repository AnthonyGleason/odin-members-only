var express = require('express');
var router = express.Router();
const {createUser,getUser,getAllUsers,updateUser,deleteUser} = require('../controllers/User');

const attemptLogin = async function(user,pass,req){
  const userObj = await getUser(user);
  if (!userObj) return 0;
  if (userObj.password===pass){
    req.session.username=userObj.userName;
    return true
  }else{
    return false;
  }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.username){
    res.render('signedIn');
  }else{
    res.render('notSignedIn');
  }
});

//login
router.get('/login', function (req,res,next){
  res.render('login');
});
router.post('/login',async function (req,res,next){
  let isSignedIn = await attemptLogin(req.body.username,req.body.password,req);
  if (isSignedIn===true){
    res.redirect('/');
  }else{
    res.redirect('/login');
  }
})

//logout
router.post('/logout', function (req,res,next){
  req.session.destroy((err)=>{
    if (err){
      console.log(err);
    }else{
      res.redirect('/');
    }
  });
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