const User = require("../models/User");

module.exports = async (req, res, next) => {
  const user = await User.findById(req.userId);

  if (user.isAdmin) {
    return next();
  }

  return res.status(400).send({ error: 'Unauthorized user' });
};