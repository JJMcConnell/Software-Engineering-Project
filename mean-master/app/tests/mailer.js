'use strict';

var mailer = require("mailer")
, username = "trevorkowens@gmail.com"
, password = "WD6Av_7xpEyY_rgoRzFNGg";

mailer.send(
  {
      host: "smtp.mandrillapp.com"
  , port: 587
  , to: "trevorkowens@gmail.com"
  , from: "trevorkowens@gmail.com"
  , subject: "Mandrill knows Javascript!"
  , body: "Reset your password using this link! \n www.link.com"
  , authentication: "login"
  , username: username
  , password: password
  }, function (err, result) {
      if (err) {
          console.log(err);
      }
  }
);