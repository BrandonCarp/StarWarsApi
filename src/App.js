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

  // const [loading, setLoading] = useState(true);


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

  // const loadingScreen = (data) => {
  //     if(data ===  false) {
  //       setLoading(false);
  //     } else {
  //       setLoading(true);
  //     }
  // }

  useEffect(() => {
    fetchPeople();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <div>
     <Header />
     {/* <SearchBar /> */}
{/* 
     {loading ? <img src={swloading} alt='loading'/> : <CharacterList loadingScreen={loadingScreen()} list={characters}/>} */}
      <CharacterList  list={characters}/>
     <h4>Real Buttons Below</h4>
     <button onClick={(e) => backPage()}>Back Page</button>
     <button onClick={(e) => fetchPeople()}>Next Page</button>
     
     
    </div>
  );
}

export default App;
