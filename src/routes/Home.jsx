import { Link } from "react-router-dom";
  import { useParams } from 'react-router-dom';
  import { useState,useEffect } from 'react'
  import { createRoot } from 'react-dom/client'

  import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export default function Home(){
    import.meta.env.VITE_API_HOST;
    const [bio, setBio] = useState(null);

    useEffect(() => {
      // Fetch data from API
      async function fetchData() {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto'); 
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
      
      
    </>
            
        )
      }

