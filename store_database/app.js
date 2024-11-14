import express from 'express';
import contactsRouter from './routes/items.js';
import customersRouter from './routes/customers.js';

const port = process.env.PORT || 3000;
const app = express();

  
// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes

app.use('/api/items', contactsRouter);
app.use('/api/customers', customersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




