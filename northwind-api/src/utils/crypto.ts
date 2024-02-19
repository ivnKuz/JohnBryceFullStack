  
import { createHash } from 'crypto';
import userDTO from '../models/auth/user-dto'
import { sign } from 'jsonwebtoken';
  //encrypt password, md5 has a problem that it saves the same strings in same encryption
  export function hashPassword(plainTextPassword:string, salt:string): string{
    return createHash('md5')
    .update(`${plainTextPassword}${salt}`) // <= adding some text to hashed password "SALTING"
    .digest('hex');
}

//returns json web token jwt
export function generateJWT(user: userDTO, secret: string, expiresIn: string): string {
    return sign({ user }, secret,{ expiresIn});
}