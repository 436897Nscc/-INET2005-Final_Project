export default function Delete(){
    

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
          method: 'DELETE',
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
        <h1>Delete Contact</h1>
    )
}