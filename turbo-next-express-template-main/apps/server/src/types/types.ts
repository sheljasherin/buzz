// Update the ICognitoJWTUserData interface
export interface ICognitoJWTUserData {
  
  sub: string; // This is the user's unique ID
  iss: string;
  origin_jti: string;
  token_use: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  "cognito:username": string;
  email: string;
  id?:string;
}
