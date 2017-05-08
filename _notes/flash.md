##
var flash = require('express-flash');
app.use(flash());

// Add error 
req.flash('errors', 'Account with that email address already exists.')

// Display error
res.render('accounts/signup', {errors: req.flash('errors')});       