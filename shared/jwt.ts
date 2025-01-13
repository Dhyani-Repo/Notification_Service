import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

export function generateToken(payload:any): any {
  console.log("🚀 ~ ACCESS_SECRET_KEY:", ACCESS_SECRET_KEY)
  console.log("🚀 ~ REFRESH_SECRET_KEY:", REFRESH_SECRET_KEY)
  const access_token = jwt.sign(payload, ACCESS_SECRET_KEY as string, {expiresIn:'1h'});
  console.log("🚀 ~ generateToken ~ access_token:", access_token)
  const refresh_token = jwt.sign(payload, REFRESH_SECRET_KEY as string, { expiresIn: '7h' });
  console.log("🚀 ~ generateToken ~ refresh_token:", refresh_token)
  const tokens = {
    access_token,
    refresh_token
  }
  return tokens
}
  
export function verifyAccessToken(token: string):any {
  try {
    const decoded = jwt.verify(token, ACCESS_SECRET_KEY as string);
    console.log("🚀 ~ verifyToken ~ decoded:", decoded)
    return decoded;
  } catch (error) {
    console.error('Invalid or expired token');
    return null;
  }
}

export function verifyRefreshToken(token: string):any {
  try {
    const decoded = jwt.verify(token, REFRESH_SECRET_KEY as string);
    console.log("🚀 ~ verifyToken ~ decoded:", decoded)
    return decoded;
  } catch (error) {
    console.error('Invalid or expired token');
    return null;
  }
}