import {useForm} from "react-hook-form";
import { useState,useEffect } from 'react'
import { Link } from "react-router-dom";
import { useFormData } from 'herotofu-react';
export default function Create(){


    
    const { register, handleSubmit, formState: { errors } } = useForm();
    import.meta.env.VITE_API_HOST;
    const [bio, setBio] = useState(null);

    useEffect(() => {
      // Fetch data from API
      
      async function fetchData() {
        const response = await fetch('http://localhost:3000/api/contacts/create'); 
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
    const { formState, getFormSubmitHandler } = useFormData('http://localhost:3000/api/contacts/create');
    return(
        <>
            {!!formState.status && <div>Current form status is: {formState.status}</div>}
            
            <h1>Create new contact</h1>
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
            <form id='newContact' onSubmit={getFormSubmitHandler()}>
                <label className="form-label">First Name </label>
                <input {...register("name")} type="text" className="form-control bg-light" />
                <br></br>
                <label className="form-label">Last Name </label>       
                <input {...register("last name")} type="text" className="form-control bg-light" />
                <br></br>   
                <label className="form-label">Title </label>
                <input {...register("title")} type="text" className="form-control bg-light" />
                <br></br>    
                <label className="form-label">Email </label>
                <input {...register("email")} type="text" className="form-control bg-light" />
                <br></br>   
                <label className="form-label">Phone </label>
                <input {...register("phone")} type="text" className="form-control bg-light" />
                <br></br>
                <label className="form-label">Picture</label>
                <input {...register("filename")} type="text" className="form-control bg-light" />
                <br></br>
                <br></br>
                
                <button type="submit"> </button>
            </form>

            <script> 
                
            </script>
        </>
        
    )
    
}