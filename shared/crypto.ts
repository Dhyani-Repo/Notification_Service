import * as crypto from 'crypto';


const secretKey:Buffer = Buffer.from((process.env.CRYPTO_SECRET_KEY as string), 'hex');
const iv:Buffer = Buffer.from(process.env.CRYPTO_IV_KEY as string, 'hex');


export const encryptByCrypto = (text: string): string => {
  console.log('Encrypt function input text:', text); // Log the input value
  if (!text) {
    throw new Error('Text is required for encryption');
  }
  const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
  let encrypted: string = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};


export const decrypt = (encryptedText: string): string =>  {
  const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
  let decrypted: string = decipher.update(encryptedText, 'hex', 'utf8');  
  decrypted += decipher.final('utf8'); 
  return decrypted;
}

export const hashPassword = (
  token: string, 
  salt: string, 
  iterations: number = 600000, 
  keyLength: number = 32
): string => {
  const hash = crypto.pbkdf2Sync(token, salt, iterations, keyLength, 'sha256');
  return `pbkdf2_sha256$${iterations}$${salt}$${hash.toString('base64')}`;
};







































// import * as crypto from 'crypto';



// const secretKey: Buffer = Buffer.from(process.env.SECRET_KEY!, 'hex'); 
// console.log("🚀 ~ secretKey:", secretKey)
// const iv: Buffer = Buffer.from(process.env.IV!, 'hex'); 

// // Example plain text
// const text = 'Hello, this is a secret message!';

// // Encryption function
// function encrypt(text: string, key: Buffer, iv: Buffer): string {
//   const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
//   let encrypted = cipher.update(text, 'utf8', 'hex');  
//   encrypted += cipher.final('hex'); 
//   return encrypted;
// }

// function decrypt(encryptedText: string, key: Buffer, iv: Buffer): string {
//   const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
//   let decrypted = decipher.update(encryptedText, 'hex', 'utf8');  // Decrypt from 'hex', output in 'utf8'
//   decrypted += decipher.final('utf8');  // Add any final decrypted data
//   return decrypted;
// }

// const encryptedText = encrypt(text, secretKey, iv);
// console.log('Encrypted:', encryptedText);

// // Decrypt the text
// const decryptedText = decrypt(encryptedText, secretKey, iv);
// console.log('Decrypted:', decryptedText);

// // Check if the decrypted text matches the original text
// console.log('Decryption was successful:', decryptedText === text);
