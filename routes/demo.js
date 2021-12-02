const express = require('express');
const session = require('express-session');
const path = require('path');


const db = require('../data/database');

const router = express.Router();

router.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname,"../views" ,"welcome.html"));
});

router.get('/signup', function (req, res) {
  res.sendFile(path.resolve(__dirname,"../views" ,"signup.html"));
});

router.get('/login', function (req, res) {
  res.sendFile(path.resolve(__dirname,"../views" ,"login.html"));
});

router.post('/signup', async function (req, res) {
  const userData = req.body;
  const enteredName = userData.name;
  const enteredEmail = userData.email;
  const enteredConfirmemail = userData["confirm-email"];
  const enteredPassword = userData.password;

  const user = {
    email:enteredEmail,
    name :enteredName,
    password:enteredPassword
  }

  let checkemail = await db.query("SELECT * FROM project.users WHERE Email = (?) ",[user.email]);
  console.log(checkemail[0]); 
  
  if(checkemail[0].length > 0){
    console.log("Emailid already exists");
    return res.redirect("/signup");
  }

  await db.query('INSERT INTO project.users (Name,Email,Password) VALUES (?,?,?)',[user.name,user.email,user.password]);
  res.redirect("/login");
});

router.post('/login', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const user = {
    email:enteredEmail,
    password:enteredPassword
  }

  
  let checkemailPassword = await db.query("SELECT * FROM project.users WHERE Email = (?) AND Password = (?)",[user.email,user.password]);
  console.log(checkemailPassword[0]);

  if(checkemailPassword[0].length === 0){
    console.log("emailcheck");
    return res.redirect("/login");
  }

  req.session.user = {id :checkemailPassword[0].id, email:checkemailPassword[0].email}
  req.session.isAuthenticated = true;
  req.session.save(function(){
    console.log("user is authenticated");
    if(checkemailPassword[0].IsAdmin === 1){
      return res.redirect("/admin");
    }
    res.redirect("/allproducts");
  });

});

router.get('/admin', function (req, res) {

  if (!req.session.isAuthenticated){
    return res.status(401).sendFile(path.resolve(__dirname,"../views" ,"401.html"));
  }
  res.sendFile(path.resolve(__dirname,"../views" ,"admin.html"));
});

router.get("/allproducts", function(req,res){
  if (!req.session.isAuthenticated){
    return res.status(401).sendFile(path.resolve(__dirname,"../views" ,"401.html"));
  }
  res.sendFile(path.resolve(__dirname,"../views" ,"allproducts.html"));

})

router.get("/admin/newproduct", function(req,res){
  
  if (!req.session.isAuthenticated){
    return res.status(401).sendFile(path.resolve(__dirname,"../views" ,"401.html"));
  }
  res.sendFile(path.resolve(__dirname,"../views" ,"newproduct.html"));

})


router.get("/admin/addproduct", function(req,res){
  
  if (!req.session.isAuthenticated){
    return res.status(401).sendFile(path.resolve(__dirname,"../views" ,"401.html"));
  }
  res.sendFile(path.resolve(__dirname,"../views" ,"newproduct.html"));

})

router.post('/logout', function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");

});



module.exports = router;
