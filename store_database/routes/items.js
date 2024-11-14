import express from 'express';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

const router = express.Router();

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
  const items = await prisma.item.findMany();

  res.json(items);
});

router.get('/get/:id', async (req, res) => {  
  const id = req.params.id;
  if(isNaN(id)){
    res.status(400).send('Invalid item id.');
    return;
  }

  const item = await prisma.item.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if(item){
    res.json(item);
  } else {
    res.status(404).send('item not found.');
  }  
});

router.post('/create', upload.single('image'), async (req, res) => {
  const { firstName, lastName, phone, email } = req.body;  

  if(!firstName || !lastName || !phone || !email) { 
    res.status(400).send('Required fields must have a value.');
    return;
  }
  const item = await prisma.item.create({
    data: {
      name: itemName,
      price: itemPrice,
    }
  });
  
  res.json(item);
});

router.put('/update/:id', upload.single('image'), (req, res) => {
  const id = req.params.id;
  if(isNaN(id)){
    res.status(400).send('Invalid item id.');
    return;
  }

    if(!firstName || !lastName || !phone || !email) {
      res.status(400).send('Required fields must have a value.');
      return;
    }
  
 const item = prisma.item.update({
  where: {
    id: parseInt(id),
  },
  data: {
    name: itemName,
    price: itemPrice,
  }
});
    res.send('')
  res.send('Update a item by ' + id);
});
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  prisma.item.delete({
    where: {
      id: parseInt(id),
    }
  })

  res.send('Delete a item by id ' + id);
});


export default router;

