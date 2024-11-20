import { useState, useEffect} from 'react';

export default function Item() {

  const [item, setitem] = useState(null);

  // fetch item from api
  useEffect(() => {
    async function getUserSession() {
      const url = "http://localhost:3000/api/users/item";
      const response = await fetch(url, {
        method: "GET",
        credentials: 'include' // inlcude cookies in request
      });

      if(response.ok) {
        const data = await response.json();
        setitem(data);
      }
      else {
        // handle error
      }
    }

    getUserSession();
  }, []);

  return (
    <>
      <h1>My item</h1>
      {
        item && 
        <div>
          Name: {item.name}<br/>
          Price: {item.price}<br/>
        </div>
      }
    </>
  )
}