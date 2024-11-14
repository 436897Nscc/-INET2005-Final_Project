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

// Get a contact by id
router.get('/get/:id', async (req, res) => {
  const id = req.params.id;

  // Validate id
  if(isNaN(id)){
    res.status(400).send('Invalid contact id.');
    return;
  }

  const contact = await prisma.contact.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if(contact){
    res.json(contact);
  } else {
    res.status(404).send('Contact not found.');
  }  
});

// Add a new contact
router.post('/create', upload.single('image'), async (req, res) => {
  const { firstName, lastName, phone, email, title } = req.body;  
  const filename = req.file ? req.file.filename : null;
  
  // Validate inputs
  if(!firstName || !lastName || !phone || !email) {
    // to-do: delete uploaded file
    res.status(400).send('Required fields must have a value.');
    return;
  }

  // to-do: validate proper email, proper phone number, only .jpg/.png/.gig/, file size limit (5MB)

  const contact = await prisma.contact.create({
    data: {
      name: itemName,
      price: itemPrice,
    }
  });
  
  res.json(contact);
});

// Update a contact by id
router.put('/update/:id', upload.single('image'), (req, res) => {
  const id = req.params.id;
  // Validate id
  if(isNaN(id)){
    res.status(400).send('Invalid contact id.');
    return;
  }
    // Validate inputs
    if(!firstName || !lastName || !phone || !email) {
      // to-do: delete uploaded file
      res.status(400).send('Required fields must have a value.');
      return;
    }
  
    // to-do: validate proper email, proper phone number, only .jpg/.png/.gig/, file size limit (5MB)
  

 // capture the inputs
 // validate the id

 // validate required fields

 // Find the contact by id (if not found, return 404)

 // store filename in a variable

 // if file was uploaded, save that filename, and delete the old file. If not, save the old filename

 // Update the database record with prisma (saving either the old or new filename)
 const contact = prisma.contact.update({
  where: {
    id: parseInt(id),
  },
  data: {
    name: itemName,
    price: itemPrice,
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
  // verify id is a number

  // Find the contact by id (if not found, return 404)

  // delete the record with prisma

  // delete the file (if contact has one)

  res.send('Delete a contact by id ' + id);
});


export default router;

