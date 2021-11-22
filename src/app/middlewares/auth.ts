import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: 'TokenNotFound', message: 'Token não informado' });
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req['userId'] = decoded['id'];
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: 'InvalidToken', message: 'Token inválido' });
  }
};
