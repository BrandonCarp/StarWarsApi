import { useState, useEffect } from "react";
import axios from "axios";
import CharacterList from "./Components/CharacterList";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import swloading from './Components/swloading.gif';


const App = () => {
  const [characters, setCharacters] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState("https://swapi.dev/api/people/");
  const [backPageUrl, setBackPageUrl] = useState('');
  const [loading, setLoading] = useState();
 const [testing, setTesting] = useState([]);

  const fetchPeople = async () => {
    const { data } = await axios.get(nextPageUrl);
    setCharacters(data.results);
    setNextPageUrl(data.next);
    setBackPageUrl(data.previous);
  }

  const backPage = async () => {
      const { data } = await axios.get(backPageUrl);
      setCharacters(data.results);
      setNextPageUrl(data.next);
      setBackPageUrl(data.previous);
  }

  const getThings = async () => {
    const {data} = await axios.get(nextPageUrl);
    return data;
  }


  useEffect(() => {
    fetchPeople() 
    async function getStuff() {
      const things = await getThings();
      setTesting(things);
    }
     getStuff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 

  return (
    <div>
     <Header />
      <CharacterList  list={characters}/>
     <h4>Real Buttons Below</h4>
     <button onClick={(e) => backPage()}>Back Page</button>
     <button onClick={(e) => fetchPeople()}>Next Page</button>
     <h3>Test Button</h3>
     <button onClick={console.log('testBTN', testing)}>Test</button>
     
    </div>
  );
}

export default App;
