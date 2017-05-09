##
    - Cookie is the data stored by the browser and send to the server with every request
    - Session is a collection of data stored on the serer and associated with a given user (usually via a cookie containing a id)
    
## Using cookie and session
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.use(cookieParser());

## Signup and Login
