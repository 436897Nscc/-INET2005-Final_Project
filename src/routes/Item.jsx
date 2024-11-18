import {useForm} from "react-hook-form";
import { useState,useEffect } from 'react'
import { Link } from "react-router-dom";
import { useFormData } from 'herotofu-react';
import myShoopingCart from './myShoopingCart'
export default function Create(){


    // url's used 
    // https://www.react-hook-form.com/api/useform/handlesubmit/
    // https://stackoverflow.com/questions/60901667/how-do-i-perform-a-post-request-only-when-form-is-validated-with-react-hook-form
    // https://react-hook-form.com/docs/useform/handlesubmit
    // https://react-hook-form.com/docs/useform/formstate
    // https://stackoverflow.com/questions/68505071/how-do-i-post-form-data-using-fetch-and-react   
    // https://stackoverflow.com/questions/34351804/how-to-declare-a-global-variable-in-react
    const { register, handleSubmit, formState: { errors, isSubmitting, touchedFields, submitCount } } = useForm();

    const onSubmit = async (e) => {
        console.log(JSON.stringify(e));
        console.log('Submitting form');
        const body = JSON.parse(JSON.stringify(e));
        fetch('http://localhost:3000/api/get/all', {
            mode:  'no-cors',
            method: 'GET',
        }).then((response) => {
            console.log(response.json);
            let responseDump = response.json;
            for(let key in responseDump){

                document.getElementById("itemsHolder").innerHTML += 
                ('<h3>' + key.name + '<h3> <br>' + '<h4>' + key.price + '<h4> <br> <button> Add to cart> </button> <br>');
            }
            });
        };
        useEffect(() => {
            // Fetch data from API
            async function fetchData() {
              const response = await fetch('http://localhost:3000/api/get/all'); 
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
            <div id="itemsHolder">




            </div>
            <script> 
                
            </script>
        </>
        
    )
    
}