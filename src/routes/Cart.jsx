import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useState,useEffect } from "react";
export default function Cart() {
  const [user, setUser] = useState("Nobody logged in");
  const [items, setItems] = useState([]); // All items
  const [cart, setCart] = useState([]); // User's cart items
  // react-hook-form
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");

  // form submit function
  useEffect(() => {
    async function fetchCartItems() {
   
        const response = await fetch("http://localhost:3000/api/items/cart", {
          method: "GET",
          credentials: "include", // Include session cookies
        });

        if (response.ok) {
          const data = await response.json();
          setCartItems(data.cart || []);
          setMessage(data.message || "");
        } else if (response.status === 401) {
          setMessage("Please log in to view your cart.");
        } else {
          const errorData = await response.json();
          setMessage(errorData.error || "An error occurred while fetching your cart.");
        }
      
    }

    fetchCartItems();
  }, []);
  
  return (
    <>
          <div>
      <h1>Your Cart</h1>
      {message && <p>{message}</p>}
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((cartItem) => (
            <li key={cartItem.id}>
              <p><strong>Item:</strong> {cartItem.item.name}</p>
              <p><strong>Price:</strong> ${cartItem.item.price}</p>
              <p><strong>Quantity:</strong> {cartItem.quantity}</p>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        !message && <p>Your cart is empty.</p>
      )}
    </div>
      
    </>
  )
}