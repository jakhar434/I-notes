const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Router } = require("express");
require('dotenv').config();
const JWT_secret = process.env.REACT_APP_JWTSECRET;

const fetchuser = require('../middleware/fetchuser');

//use of express validator for validation 
//use of bcrypt.js to convert password to hash password by generating salt and cahnged to salt hashed password
// use of {jwt } is to generate a token when client login
// console.log(JWT_secret);

//ROUTE:1 POST METHOD--- creating a user, /api/auth/createuser
router.post("/createuser",[
  body('name', 'enter a valid name').isLength({ min: 3 }),
  body('email', 'enter a valid email').isEmail(),
  body('password', 'enter a valid password').isLength({ min: 5 })
],

  async (req, res) => {
    let success= false;

    // if there is any error return that error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    // checking if user exit and User is because we are exporting it
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: " sorry, This email already exit. try with another email" });
      }


      // generate salt and store in database
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // as id is unique for every user
      const data = {
        user: {
          id: user.id,
        }
      }
      // generating a token using jwt.sign
      const authToken = jwt.sign(data, JWT_secret)
      success= true;
      res.json({ success,authToken });
    }
    catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured")
    }

  });





//ROUTE2:  login crdential, user email and password

router.post("/login",
  body('email', 'enter a valid email').isEmail(),
  body('password', 'enter a valid password').exists(),

  async (req, res) => {
    let success = false;
    // if there is any error return that error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {

      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ error: "Please login with correct credentials" });
      }

      // matching password of user and server
      const passcompare = await bcrypt.compare(req.body.password, user.password);
      if (!passcompare) {
        success= false;
        return res.status(400).json({ success, error: "Please login with correct credentials" });

      }
      // if person entered correct credential then return a token
      const data = {
        user: {
          id: user.id,
        }
      }
      const authToken = jwt.sign(data, JWT_secret);
      success= true;
      res.json({ success, authToken });// es6 as {authToken:authToken}

    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured")

    }

  });

// ROUTE 3: login required, get user detail api/auth/getuser such that to show content to login user only
router.post('/getuser', fetchuser,
  async (req, res) => {

    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");// dont include password
      res.send(user);


    }
    catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");

    }

  });




module.exports = router;