import express from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../lib/utility.js'

const router = express.Router();

const prisma = new PrismaClient();

router.post('/signup', async (req,res) => {
  // get user inputs
  return res.status(400).send(req.body);
  const {username, password,street,city,country,postal_code } = req.body  ;

  if (!username){
    return res.status(400).send('Missing username');
  }
  else if (!password){
    return res.status(400).send('Missing password');
  }
  else if (!email){
    return res.status(400).send('Missing email');
  }
  else if (!street){
    return res.status(400).send('Missing street');
  }
  else if (!city){
    return res.status(400).send('Missing city');
  }
  else if (!country){
    return res.status(400).send('Missing country');
  }
  else if (!postal_code){
    return res.status(400).send('Missing postal code');
  }



  // check for existing user
  const existingUser = await prisma.user.findUnique({
    where: {
      username: username,
    }
  });
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  // hash (encrypt) the password
  const hashedPassword = await hashPassword(password);

  // add user to database
  const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        email: email,
        street: street,
        city: city,
        country: country,
        postal_code: postal_code
      },
    });

  // send a response
  res.json({'user' : user});
});

router.post('/login', async (req,res) => {
  // get user inputs
  const { username, password } = req.body;

  // validate the inputs
  if(!username || !password) {
    return res.status(400).send('Please enter a vaild username or password');
  }

  // find user in database
  const existingUser = await prisma.user.findUnique({
    where: {
      username: username,
    }
  });
  if (!existingUser) {
    return res.status(404).send('Incorrect username');
  }

  // compare/verify the password entered
  const passwordMatch = await comparePassword(password, existingUser.password);
  if (!passwordMatch) { 
    return res.status(401).send('Invalid password');
  }

  // setup user session data
  req.session.email = existingUser.email;
  req.session.user_id = existingUser.username;
  console.log('logged in user: ' + req.session.username);

  // send response
  res.send('Login successful');
});

router.post('/logout', (req,res) => {
  req.session.destroy();
  res.send('Successful logout');
});

router.get('/session', (req,res) => {
  // return logged in user  
  res.json({ 'user' : req.session.email});
}); 
export default router;
