import { NextFunction, RequestHandler, Response } from 'express';
import { RequestWithUser } from '@/interfaces/auth.interface';
import Roles from '@/roles/roles';

const rolesmiddleware = (permittedRoles: Array<Roles>, me = false): RequestHandler => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;

    if ((user && permittedRoles.includes(user.role)) || (me && user._id)) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden for roles' });
    }
  };
};

export default rolesmiddleware;
