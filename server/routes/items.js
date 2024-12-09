import express from 'express';
import { Prisma,PrismaClient } from '@prisma/client';

const router = express.Router();

const prisma = new PrismaClient();
router.post('/cart/add', async (req, res) => {
  const { itemId, amount } = req.body; 

  // Grabs the current users  
  const userId = req.session?.user_id;
  if (!itemId || isNaN(itemId) || !amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({
      error: "Invalid input. Ensure itemId and amount are valid positive numbers.",
    });
  }
  const parsedUserId = parseInt(userId);
  const parsedItemId = parseInt(itemId);
  const parsedAmount = parseInt(amount);




  // Find if there already item in cart
  const existingCartItem = await prisma.cart.findFirst({
    where: {
      accountId: userId,
      itemId: parsedItemId,
    },
  });

  if (existingCartItem) {
    // Update the quantity if the item exists. If so add the target amount to item in cart
    const updatedCartItem = await prisma.cart.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + parsedAmount },
    });
    return res.status(200).json({ message: 'Cart updated.', cartItem: updatedCartItem });
  }

    // Add a new cart item
    const newCartItem = await prisma.cart.create({
      data: {
        accountId: parsedUserId,
        itemId: parsedItemId,
        quantity: parsedAmount,
      },
    });

    res.status(201).json({ message: 'Item added to cart.', cartItem: newCartItem });
  
});


router.post('/add', async (req,res) => {
    const {itemPrice,itemName} = req.body;
    if(!itemPrice){
      return  res.status(400).send("Invaild item price");
    }
    else if (!itemName){
      return  res.status(400).send("Invaild name for a item");
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
      res.status(404).send('Item not found.');
    }  
  }); 


  router.get('/cart', async (req, res) => {
    const userId = req.session?.user_id;
  
    
      // Fetch the user's cart items
      const cartItems = await prisma.cart.findMany({
        // check if the user has the item in their cart
        where: { accountId: userId }, 
        include: { 
          item: true, 
        },
      });
  
      if ( cartItems.length === 0) {
        return res.status(200).json({ message: "Your cart is empty."});
      } 
      res.status(200).json({ cart: cartItems });
    
  });
export default router;
