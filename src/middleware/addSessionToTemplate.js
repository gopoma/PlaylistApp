function addSessionToTemplate(req, res, next) {
  res.locals.user = req.session.user
  return next();
}

module.exports = addSessionToTemplate;