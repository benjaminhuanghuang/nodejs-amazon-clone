var router = require('express').Router();
var User = require('../models/user');

router.get("/signup", function (req, res) {
    res.render('accounts/signup');
});

// Test it by using postman
//  user x-www-form-urlencoded Body
router.post("/signup", function (req, res) {
    var user = new User();
    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    User.findOne({
        email: req.body.email
    }, function (err, existingUser) {
        if (existingUser) {
            console.log(req.body.email + "is exist");
            return res.redirect('/signup');
        } else {
            user.save(function (err) {
                if (err) return next(err);
                res.json("Successfully created a new user");
            });
        }
    });
});
module.exports = router;