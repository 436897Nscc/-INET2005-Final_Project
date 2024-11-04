import { Link } from "react-router-dom";
  import { useParams } from 'react-router-dom';
  import { useState,useEffect } from 'react'
  import { createRoot } from 'react-dom/client'

  import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
export default function Home(){
    import.meta.env.VITE_API_HOST;
    const [bio, setBio] = useState(null);

    useEffect(() => {
      // Fetch data from API
      async function fetchData() {
        const response = await fetch('http://localhost:3000/api/contacts/all'); 
        const data = await response.json();
        if (!ignore) {
          setBio(data);
        }
      }
  
      let ignore = false;
        fetchData();
      return () => {
         ignore = true;
      }
    }, []);
    
    return(
      <>
      <h1>My Contacts</h1>
      <header>
            <p>
              <Link to="/create" className="btn btn-outline-secondary">Add a Contact</Link>
            </p>
            <p>
              <Link to="/">Home</Link>
            </p>
            <p>
              <Link to="/update">Update</Link>
            </p>
            <p>
              <Link to="/delete">Delete</Link>
            </p>
      </header>
      { <p>{bio.map((bios) => (
        <img key={bios.id} src={bios.url} alt={bios.title} width={100} />
        
      ))}</p>}

      
    </>
            
        )
      }

