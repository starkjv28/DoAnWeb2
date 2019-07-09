const User = require('../models/User');

const auth = function (req, res, next) {
  res.locals.currentUser = null;
  const {userId} = req.session;
  if (!userId) {
    next();
  } else {
    User.findOne({
      where: {
        id: userId,
      }
    }).then(function (user) {
      if (!user) {
        delete req.session.userId;
        next();
      } else {
        req.currentUser = user;
        res.locals.currentUser = user;
        next();
      }
    }).catch(next);
  }
}

module.exports = auth;