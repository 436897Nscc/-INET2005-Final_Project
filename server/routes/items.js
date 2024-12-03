import express from 'express';
import { Prisma,PrismaClient } from '@prisma/client';

const router = express.Router();

const prisma = new PrismaClient();

router.post('/add', async (req,res) => {
    const {itemPrice,itemName} = req.body;
    if(!itemPrice){
        req.status(400).send("Invaild item price");
    }
    else if (!itemName){
        req.status(400).send("Invaild name for a item");
    }
    const existingItem = await prisma.item.findUnique({
        where: {
          item: itemName,
        }
      });
      if (existingItem) {
        return res.status(400).send('A item of this name already is in the system');
      }
    const item = await prisma.item.create({
        data: {
          price: parseInt(itemPrice),
          name: itemName
        },
      });
      res.json({'item' : itemName});
});
router.get('/all', async (req, res) => { 
  const items = await prisma.item.findMany();

  res.json(items);
}); 
router.get('/item/:id', async (req, res) => { 
    const id = req.params.id;

    // Validate id
    if(isNaN(id)){
      res.status(400).send('Invalid item id.');
      return;
    }
  
    const itemGrab = await prisma.item.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  
    if(itemGrab){
      res.json(itemGrab);
    } else {
      res.status(404).send('Contact not found.');
    }  
  }); 
export default router;
