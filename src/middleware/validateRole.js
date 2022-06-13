function validateRole(neededRole) {
  return function(req, res, next) {
    if(req.session.user.role < neededRole) {
      return res.redirect("/notAllowed");
    }
    return next();
  }
}

module.exports = validateRole;