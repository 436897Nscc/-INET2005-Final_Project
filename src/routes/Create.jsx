import {useForm} from "react-hook-form";
import { useState,useEffect } from 'react'
import { Link } from "react-router-dom";
import { useFormData } from 'herotofu-react';
export default function Create(){


    // url's used 
    // https://www.react-hook-form.com/api/useform/handlesubmit/
    // https://stackoverflow.com/questions/60901667/how-do-i-perform-a-post-request-only-when-form-is-validated-with-react-hook-form
    // https://react-hook-form.com/docs/useform/handlesubmit
    // https://react-hook-form.com/docs/useform/formstate
    // https://stackoverflow.com/questions/68505071/how-do-i-post-form-data-using-fetch-and-react   
    
    const { register, handleSubmit, formState: { errors, isSubmitting, touchedFields, submitCount } } = useForm();
    async function fetchData() {
        const response = await fetch('http://localhost:3000/api/contacts/create'); 
        const data = await response.json();
        if (!ignore) {
          setBio(data);
        }
      
  
      let ignore = false;
        fetchData();
      return () => {
         ignore = true;
      }
    }
    const onSubmit = async (e) => {
        console.log(JSON.stringify(e));
        console.log('Submitting form');
        const body = JSON.parse(JSON.stringify(e));
        fetch('http://localhost:3000/api/contacts/create', {
            mode:  'no-cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(body)
        }).then((response) => {
            console.log(response);
            return response.json(); // do something with response JSON
          });
        };
    const onError = (errors, e) => console.log(errors, e);
    return(
        <>
           
            
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
            <form id='newContact' onSubmit={handleSubmit(onSubmit)}>
                <label className="form-label">First Name </label>
                <input {...register("firstName")} type="text" className="form-control bg-light" />
                <br></br>
                <label className="form-label">Last Name </label>       
                <input {...register("lastName")} type="text" className="form-control bg-light" />
                <br></br>   
                <label className="form-label">Title </label>
                <input {...register("title")} type="text" className="form-control bg-light" />
                <br></br>    
                <label className="form-label">Phone </label>
                <input {...register("phone")} type="text" className="form-control bg-light" />
                <br></br>   
                <label className="form-label">Email </label>
                <input {...register("email")} type="text" className="form-control bg-light" />
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