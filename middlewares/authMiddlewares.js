const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Assuming the token is provided in the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRETKEY);

    if (!req.userContext) {
      req.userContext = { userId: 0 };
    }

    req.userContext.userId =
      typeof decoded === 'object' && 'userId' in decoded ? Number(decoded.userId) : 0;
    next();
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: 'Invalid token.' });
  }
};
module.exports = verifyToken

