const express = require('express');

const router = express.Router();

/*
The route defines a callback that will be invoked whenever an HTTP GET request with
the correct pattern is detected. The matching pattern is the route specified when
the module is imported ('/users') plus whatever is defined in this file ('/').
In other words, this route will be used when an URL of /users/ is received.

"next" not currently used - but useful if need to add multiple route handlers to the
'/' route path

*/

router.get('/', (req, res) => {
  res.render('users', { title: 'Users Page' });
});

module.exports = router;
