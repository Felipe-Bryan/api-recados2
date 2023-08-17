import { NextFunction, Request, Response } from 'express';
import { JwtService } from '../../../shared/services/jwt.service';
import { ApiResponse } from '../../../shared/util/http-response.adapter';

export class LoginValidator {
  public static checkToken(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req);
      // verificar se um token foi informado
      const token = req.headers.authorization;

      if (!token) {
        return ApiResponse.invalidCredentials(res);
      }

      // verificar se é um token válido
      const isValid = new JwtService().verifyToken(token);

      if (!isValid) {
        return ApiResponse.invalidCredentials(res);
      }

      next();
    } catch (error: any) {
      return ApiResponse.serverError(res, error);
    }
  }
}
