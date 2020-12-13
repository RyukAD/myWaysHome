const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require("lodash");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});
app.use(express.json())

app.use(bodyParser.urlencoded({extended: true}));

//session info using passport.js
app.use(session({
  secret: 'Our little secret.',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/myWaysDB", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  password: String,
  email: String,
});
userSchema.plugin(passportLocalMongoose);

//create collections
const User = new mongoose.model("User", userSchema);

//create strategy for local authentication
passport.use(User.createStrategy());

//serialize and deserialize user for auto login
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.post("/register", (req, res, next) => {
  User.register({username: req.body.email, fName: req.body.fName, lName: req.body.lName}, req.body.password, function(err, user){
    if (err){
      console.log(err);
      res.redirect("http://localhost:3000")
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/")
      });
    }
  });

  app.post("/login", (req, res, next) => {
    const user = new User({
      username: req.body.email,
      password: req.body.password

    })
    req.login(user, (err)=>{
      if (err)  {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, function(){
          res.redirect('/')
        })
      }
    })
  })

    console.log(req.body)
    res.send({msg:req.data,status:201})
});

app.listen(3001, function(){
  console.log("Server started succesfully on 3000");
})
