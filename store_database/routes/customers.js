import express from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/'); // save uploaded files in `public/images` folder
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop(); // get file extension
    const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1000) + '.' + ext; // generate unique filename - current timestamp + random number between 0 and 1000.
    cb(null, uniqueFilename);
  }
});
const upload = multer({ storage: storage });

// Prisma setup
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// Get all contacts
router.get('/all', async (req, res) => { 
  const contacts = await prisma.contact.findMany();

  res.json(contacts);
});
router.get("/sign_in"), async(req,res) => {
    const { userName,password,email,phone } = req.body; 
    
    
    if(isNaN(id)){
        res.status(400).send('Could not find account');
        return;
      }
    const item = await prisma.contact.findUnique({
    where: {
        id: userName,
        password: password,
    },
    });

    if(item){
        res.json(item);
        return true;
    } else {
    res.status(404).send('Account not found.');
    }  

}
router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
  
    // Validate id
    if(isNaN(id)){
      res.status(400).send('Could not find account');
      return;
    }
  
    const item = await prisma.contact.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  
    if(item){
      res.json(item);
    } else {
      res.status(404).send('Account not found.');
    }  
  });

// Add a new contact
router.post('/create', async (req, res) => {
  const { userName,password,email,phone } = req.body;  
  
  // Validate inputs
  if(!userName || !password) {
    // to-do: delete uploaded file
    res.status(400).send('Required fields must have a value.');
    return;
  }

  // to-do: validate proper email, proper phone number, only .jpg/.png/.gig/, file size limit (5MB)

  const contact = await prisma.contact.create({
    data: {
      userName: userNameNew,
      password: userPassword,
      email: userEmail,
      phone: userPhone,
    }
  });
  
  res.json(contact);
});

// Update a contact by id
router.put('/update/:id', (req, res) => {
  const id = req.params.id;
  // Validate id
  if(isNaN(id)){
    res.status(400).send('Invalid .');
    return;
  }
    // Validate inputs
    if(!firstName || !lastName) {
      // to-do: delete uploaded file
      res.status(400).send('Required fields must have a value.');
      return;
    }
  

 const contact = prisma.cutomers.update({
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
  res.send('Update a contact by ' + id);
});

// Delete a contact id
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  prisma.contact.delete({
    where: {
      id: parseInt(id),
    }
  })
  res.send('Deleted a Acount by id ' + id);
});


export default router;

