import { Link } from "react-router-dom";
  import { useParams } from 'react-router-dom';
  import { useState,useEffect } from 'react'
  import { createRoot } from 'react-dom/client'

  import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/
export default function SignIn(){
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
    const onSubmit = async (e) => {
      console.log(JSON.stringify(e));
      console.log('Submitting form');
      const body = JSON.parse(JSON.stringify(e));
      fetch('http://localhost:3000/api/contacts/create', {
          mode:  'no-cors',
        method: 'GET',
        body: JSON.stringify(body)
      }).then((response) => {
          if(response){
              <Route path='/Home' component={component}/>
          }
          else{
            document.getElementById("logInCheck").innerHTML = "Entered Username Or password is incorrect."
          }
          return response.json(); // do something with response JSON
        });
      };
  const onError = (errors, e) => console.log(errors, e);
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
      <form onSubmit={onSubmit()}>


        <label className="form-label">User Name </label>
        <input {...register("userName")} type="text" className="form-control bg-light" />
        <br></br>
        <label className="form-label">Password</label>       
        <input {...register("lastName")} type="text" className="form-control bg-light" />
                
        <button type="submit">Sign in</button>
        

      </form>
      <p id="logInCheck"></p>
      
    </>
            
        )
      }