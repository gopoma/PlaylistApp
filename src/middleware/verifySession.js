function verifySession({authRequired, exclude}) {
  if(authRequired) {
    return function(req, res, next) {
      if(!exclude?.includes(req.path) && !req.session.user?.loggedIn) {
        return res.redirect("/notAllowed");
      }
      return next();
    }
  } else {
    return function(req, res, next) {
      if(!exclude?.includes(req.path) && req.session.user?.loggedIn) {
        return res.redirect("/");
      }
      return next();
    }
  }
}

module.exports = verifySession;