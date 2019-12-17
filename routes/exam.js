var express = require('express');
var router = express.Router();

var env = require('dotenv').config();
const Client = require('pg').Client;
const client = new Client({
  connectionString: process.env.DATABASE_URL
});
client.connect(); //connect to database

var passport = require('passport');
var bcrypt = require('bcryptjs');


/* GET users listing. */
router.get('/', function(req, res) {
  res.render('trythis', { user: req.user});

});

function encryptPWD(password){
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}
router.post('/', function(req, res, next) {
  client.query('SELECT * FROM gameusers WHERE username = $1', [req.body.username], function(err, result) {
    if (err) {
      console.log("SQL error");
      //next(err);
    }
    console.log("some");
    if (result.rows.length > 0) {
      console.log("user already here bucko");
    }
    else{
      if(req.body.pass == req.body.pass2){
        console.log("new passes match");
        var newpass = encryptPWD(req.body.pass2)
        client.query('INSERT INTO gameusers (username, password, value) VALUES($1, $2,1)', [req.body.username, newpass], function(err, result) {
        res.render('trythis', {successPass: "true"});
        console.log("we made it");
        return res.redirect('/exam/quizone');
        });
      }
      else{
        console.log("new not matching");
        res.render('trythis', {nonMatch: "true"});
      }
    }
  });

});

router.get('/quizone', function(req, res){
  res.render('quizone',{user: req.user});
});



router.post('/quizone', function(req, res,next){
  console.log("here");
  client.query('SELECT * FROM gameusers WHERE username = $1', [req.user.username], function(err, result) {
    console.log("it");
    if (err) {
      console.log("SQL error");
      //next(err);
    }
    console.log("is");
    if (result.rows.length > 0) {
      console.log("user exist");
      client.query('UPDATE gameusers SET value = $1 WHERE username = $2', [req.body.final, req.user.username], function(err, result) {
        if (err) {
          console.log("unable to query INSERT");
          next(err);
        }
        console.log("updated values");
        res.render('quizone', {user: req.user , success: "true" });
      });
    }
    else{console.log("error checking is needed");}

  });
});










module.exports = router;
