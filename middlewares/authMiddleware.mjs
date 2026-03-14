import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'helpme';

function getTokenFromRequest(req) {
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

export function requireEditAuth(req, res, next) {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.redirect('/user/login');
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    if (payload.role === 'EditAdmin' || payload.role === 'SuperAdmin') {
      return next();
    } else {
      return res.status(403).send('Forbidden: insufficient permissions');
    }
  } catch (err) {
    return res.redirect('/user/login');
  }
}

export function requireSuperAuth(req, res, next) {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.redirect('/user/login');
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    if (payload.role === 'SuperAdmin') {
      return next();
    } else {
      return res.status(403).send('Forbidden: insufficient permissions');
    }
  } catch (err) {
    return res.redirect('/user/login');
  }
}
