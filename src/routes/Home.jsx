import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
export default function Home(){
  const [user, setUser] = useState('');
  const [items, setItems] = useState([]); 
  const navigate = useNavigate();
  async function addItem(data) {
    // Checks if their is a current user signed in
    if(user == undefined){
     return alert("Please log in to add items to your cart");
    }
    const amountAdded = document.getElementById("amount" + data).value;
    const items = { itemId: data, amount: amountAdded };
    const response = await fetch("http://localhost:3000/api/items/cart/add", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
         credentials: 'include',
      body: JSON.stringify(items),
    });
  }
  
  useEffect(() => {
    // Grabs all the items to load into the page. Sends a error to the console if their are any problems.
    async function showItems() {
        const response = await fetch('http://localhost:3000/api/items/all', {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setItems(data); // Save items to state
        } else {
          return alert("Failed to fetch items.");
        }
      }
    async function getUserSession() {
      const response = await fetch('http://localhost:3000/api/users/session', {
        method: "GET",
        credentials: 'include' // inlcude cookies in request
      });

      if(response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
      else {
        setUser('Nobody logged in');
      }
    }
    showItems();
    getUserSession();
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div id="itemList">

          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id}>
                <p >
                
                 <h3 onClick={() => navigate(`/item/${item.id} `)} style={{ cursor: "pointer", color: "blue" }}> {item.name} </h3>
                </p>
                
                <p>
                  <strong>Price:</strong> ${item.price}
                </p>
                <button onClick={() => addItem(item.id)}>Add Item</button>
              
                <input type="number" id={"amount" + item.id} defaultValue="1" name="quantity" min="1" max="99"></input>
              </div>
            ))
          ) : (
            <p>No items available.</p>
          )}
        </div>
      <p>User: {user}</p> 
    </>
  )
}