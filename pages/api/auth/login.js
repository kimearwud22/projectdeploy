import { prisma } from '../../../libs/prisma.libs';
import * as jose from 'jose';

export default function handler(req, res){
  if(req.method === 'POST'){
    const { username, password } = req.body;
    if(username && password){
      prisma.user.findUnique({
        where: {
          username: username
        }
      })
      .then(async user => {
        if(user){
          if(user.password === password){
            const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
            let token = await new jose.SignJWT({id: user.id, username: user.username}).setProtectedHeader({alg: 'HS256'}).sign(secret);
            res.status(200).json({
              message: 'Login success',
              user: {id: user.id, username: user.username, token: token}
            });
          } else {
            res.status(400).json({
              message: 'Password incorrect'
            });
          }
        } else {
          res.status(400).json({
            message: 'Username not found'
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'Internal server error! => ' + err
        });
      });
    } else {
      res.status(400).json({
        message: 'Username and password required'
      });
    }
  } else {
    res.status(405).json({
      message: 'Method not allowed'
    });
  }
}