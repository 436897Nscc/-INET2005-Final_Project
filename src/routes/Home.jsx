import { Link } from "react-router-dom";

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
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div id="travelButtons">
          <button id='homeButton'>Home</button>
          <button id='createButton'><Link to={'/Create'}>Make a new contact</Link></button>
          <button id='deleteButton'>Delete</button>
          <button id='updateButton'>Update</button>
          <h3>{contact.name}</h3>
        </div>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
      </>
            
        )
      }

