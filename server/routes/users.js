import express from 'express';
import { Prisma,PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../lib/utility.js'

const router = express.Router();

const prisma = new PrismaClient();

router.post('/signup', async (req,res) => {
  // get user inputs
  const {userName, password,email,street,city,country,postal_code } = req.body  ;

  

  if (!userName){
    return res.status(400).send('Missing username');
  }
  else if (!password){
    return res.status(400).send('Missing password');
  }
  else if (!email){
    return res.status(400).send('Missing email');
  }

  



  // check for existing us

  // hash (encrypt) the password
  const hashedPassword = await hashPassword(password);


  // add user to database
  const user = await prisma.account.create({
    data: {
      username: userName, // Map to match the schema,
      password: hashedPassword,
      email,
      street,
      city,
      country,
      postal_code,
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
  const existingUser = await prisma.account.findUnique({
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
router.get('/all', async (req, res) => { 
  const users = await prisma.account.findMany();

  res.json(users);
}); 

router.get('/session', (req,res) => {
  // return logged in user  
  res.json({ 'user' : req.session.email});
}); 
export default router;
