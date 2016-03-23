'use strict';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'supersecret-secret';

function login (req, res) {
  let userData = req.body;
  req.models.users
  .find()
  .where({email: userData.email})
  .limit(1)
  .exec(function(err, userInfo){
    if (err) {
      return res.json({error: err}, 500);
    } else {
      // encrypt password for comparison
      bcrypt.compare(userData.password, userInfo[0].password, function(err, response) {
        if (err) {
          console.log(err);
          res.json({error: err}, 500);
        } else {
          if (response === true) {
            // send user profile without password
            let profile = userInfo[0];
            profile.password = 'hidden';

            // setup token with users info and secret
            let token = jwt.sign(profile, secret, {expiresInMinutes: 60});
            res.json({token: token});
          } else {
            res.json({error: 'incorrect credentials'});
          }
        }
      });
    }
  });
}


module.exports = {
  login
};