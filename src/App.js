import { useState, useEffect } from "react";
import axios from "axios";
import CharacterList from "./Components/CharacterList";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";



const App = () => {
  const [characters, setCharacters] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState("https://swapi.dev/api/people/");
  const [backPageUrl, setBackPageUrl] = useState('');


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


  useEffect(() => {
    fetchPeople();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <div>
     <Header />
     <SearchBar />
     <CharacterList list={characters}/>
     <button onClick={(e) => console.log(characters)}>Characters</button>
     <button onClick={(e) => console.log(nextPageUrl)}>Next Page Url</button>
     <button onClick={(e) => console.log(backPageUrl)}>Back Page Url</button>
     <h4>Real Buttons Below</h4>
     <button onClick={(e) => backPage()}>Back Page</button>
     <button onClick={(e) => fetchPeople()}>Next Page</button>
     
     
    </div>
  );
}

export default App;
