const usersRouter = require('./users.router');

function router(app) {
  app.use('/', usersRouter);
}

module.exports = router;
