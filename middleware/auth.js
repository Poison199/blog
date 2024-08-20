const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Skip authentication for routes where the URL starts with `/api/public` or another criteria
  if (req.path.startsWith('/api/public')) {
    return next();
  }

  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
