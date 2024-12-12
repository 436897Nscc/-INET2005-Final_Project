import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';


export default function Item() {
  const { itemId } = useParams();
  const [user, setUser] = useState('');
  const [item, setItem] = useState([]); 
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
 
  // fetch item from api
  useEffect(() => {
    async function loadItemPage() {

      const response = await fetch(`http://localhost:3000/api/items/get/${itemId}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        if (data.description == null) {
          data.description = "This item currently doesn't have a description "
        }
        setItem(data); 
      } else {
        console.error("Failed to fetch items.");
      }
      
    }
    async function getUserSession() {
      const response = await fetch('http://localhost:3000/api/users/session', {
        method: "GET",
        credentials: 'include' 
      });

      if(response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
      else {
        setUser('Nobody logged in');
      }
    }
    loadItemPage();
    getUserSession();
  }, [itemId]);

  return (
    <>
  
    <div key={item.id}>
     
       <h1> {item.name} </h1>
     <h3>description: {item.description}</h3>
      <p>
        <strong>Price:</strong> ${item.price}
      </p>
      <button onClick={() => addItem(item.id)}>Add Item</button>

      
      <input type="number" id={"amount" + item.id} defaultValue="1" name="quantity" min="1" max="99"></input>
    </div>

 
<p>Signed in as: {user}</p> 
    </>
  )
}