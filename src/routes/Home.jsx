import { useState, useEffect } from "react";

export default function Home(){
  const [user, setUser] = useState('');
  const [items, setItems] = useState([]); 
  useEffect(() => {
    async function showItems() {
      try {
        const response = await fetch("http://localhost:3000/api/items/all", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setItems(data); // Save items to state
        } else {
          console.error("Failed to fetch items.");
        }
      } catch (error) {
        console.error("Error fetching items:", error);
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
                <p>
                  <strong>Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Price:</strong> ${item.price}
                </p>
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