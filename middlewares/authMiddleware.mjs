import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'helpme';

function getTokenFromRequest(req) {
  // Prefer Authorization header (Bearer <token>) for APIs, fall back to session-stored token
  const authHeader = req.headers?.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return req.session?.token ?? null;
}

export function requireApiAuth(req, res, next) {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: token missing' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: invalid token' });
  }
}

export function requireViewAuth(req, res, next) {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.redirect('/user/login');
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.redirect('/user/login');
  }
}
