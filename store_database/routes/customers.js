import express from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop(); // get file extension
    const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1000) + '.' + ext; // generate unique filename - current timestamp + random number between 0 and 1000.
    cb(null, uniqueFilename);
  }
});
const upload = multer({ storage: storage });

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

router.get('/all', async (req, res) => { 
  const cutomers = await prisma.cutomer.findMany();

  res.json(cutomers);
});
router.get("/sign_in/:id"), async(req,res) => {
    const { userName,password,email,phone } = req.body; 
    const id = req.params.id;
    
    if(isNaN(id)){
        res.status(400).send('Could not find account');
        return;
      }
    const cutomer = await prisma.cutomers.findUnique({
    where: {
        userName: id,
        password: password,
    },
    });

    if(cutomer){
        res.json(cutomer);
        return true;
    } else {
      return false;
    }  

}
router.get('/get/:id', async (req, res) => {
    const id = req.params.id;

    if(isNaN(id)){
      res.status(400).send('Account not found');
      return;
    }
  
    const cutomer = await prisma.cutomer.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  
    if(cutomer){
      res.json(cutomer);
    } else {
      res.status(404).send('Account not found.');
    }  
  });

router.post('/create', async (req, res) => {
  const { userName,password,email,phone } = req.body;  
  
  if(!userName || !password) {
   
    res.status(400).send('Required fields must have a value.');
    return;
  }

  const cutomer = await prisma.cutomer.create({
    data: {
      userName: userName,
      password: password,
      email: email,
      phone: phone,
    }
  });
  
  res.json(cutomer);
});


router.put('/update/:id', (req, res) => {
  const id = req.params.id;
  // Validate id
  if(isNaN(id)){
    res.status(400).send('Invalid .');
    return;
  }
  
    if(!firstName || !lastName) {
      res.status(400).send('Required fields must have a value.');
      return;
    }
  

 const cutomer = prisma.cutomers.update({
  where: {
    id: parseInt(id),
  },
  data: {
    userName: userNameNew,
    password: userPassword,
    email: userEmail,
    phone: userPhone,
  }
});
    res.send('')
  res.send('Updated customer acoount: ' + id);
});


router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  prisma.cutomer.delete({
    where: {
      id: parseInt(id),
    }
  })
  res.send('Deleted a Acount by id: ' + id);
});


export default router;

