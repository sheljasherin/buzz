import { ICurrentUser } from '@repo/types/src/schema/user';
import { ICognitoJWTUserData } from './types'; // Adjust path if needed

declare global {
  namespace Express {
    interface Request {
      user?: ICurrentUser; // Optional user from custom auth
      cognitoUser?: ICognitoJWTUserData; // If using Cognito
      clientTimeZone?: string; // Optional timezone from headers or query
    }
  }
}
