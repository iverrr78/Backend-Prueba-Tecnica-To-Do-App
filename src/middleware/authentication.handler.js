import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Continue to the route handler
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export { authenticateToken };