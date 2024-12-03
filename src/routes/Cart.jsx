import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useState,useEffect } from "react";
export default function Cart() {
  const [user, setUser] = useState("Nobody logged in");
  const [items, setItems] = useState([]); // All items
  const [cart, setCart] = useState([]); // User's cart items
  // react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [loginFail, setLoginFail] = useState(false);

  // form submit function
  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch("http://localhost:3000/api/items/cart", {
          method: "GET",
          credentials: "include", // Include cookies/session
        });
        if (response.ok) {
          const data = await response.json();
          setCart(data);
        } else if (response.status === 401) {
          console.log("User is not logged in.");
          setCart([]);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }

    async function fetchUserSession() {
      try {
        const response = await fetch("http://localhost:3000/api/users/session", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user || "Unknown User");
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    }

    fetchCart();
    fetchUserSession();
  }, []);
  
  return (
    <>
      <h1>Cart</h1>
      
    </>
  )
}