import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useState,useEffect } from "react";
export default function Cart() {
  var totalAmount = 0;
  const [user, setUser] = useState("Nobody logged in");

  const [cartItems, setCartItems] = useState([]);

  const [total, setTotal] = useState(0);


  async function deleteItem(data) {
    const response = await fetch(`http://localhost:3000/api/items/cart/delete/${data}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
         credentials: 'include',
    });
    
      window.location.href = '/cart';
    
    

  }
  useEffect(() => {
    async function fetchCartItems() {
   
        const response = await fetch("http://localhost:3000/api/items/cart", {
          method: "GET",
          credentials: "include", // Include session cookies
        });

        if (response.ok) {
          const data = await response.json();
          setCartItems(data.cart || []);
          setTotal(data.total || 0);
        } else if (response.status === 401) {
          return alert("Please log in to view your cart.");
        }
      
    }

    fetchCartItems();
  }, []);
  
  return (
    <>
          <div>
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((cartItem) => (
            <li key={cartItem.id}>
              <p><strong>Item:</strong> {cartItem.item.name}</p>
              <p><strong>Price:</strong> ${cartItem.item.price}</p>
              <p><strong>Quantity:</strong> {cartItem.quantity}</p>
              <button onClick={() => deleteItem(cartItem.item.id)}>Remove Item</button>
              <hr />
            </li>
          ))}
       
        </ul>
      ) : (
      <p>You currently don't have any item's in your cart</p>
      )}
    </div>
    <>Your total Amount: ${total}</>
      
    </>
  )
}