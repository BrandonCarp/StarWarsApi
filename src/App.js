import { useState, useEffect } from "react";
import CharacterList from "./Components/CharacterList";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";

const axios = require('axios');


function App() {
  const [characters, setCharacters] = useState([]);
  const [home, setHome] = useState([]);
  const [species, setSpecies] = useState([]);


  const getPeople = () => {
    axios.get('https://swapi.dev/api/people/?format=api')
        .then(function (response) {
          setCharacters(response.data.results);
          console.log(characters);
        })
        .catch(function (error) {
          console.log(error);
        })
  }

  // useEffect(() => {
  //   getPeople()
  //   .then(characters => 
  //     characters.map(person => 
  //       Promise.all([person, setHome(person.homeworld), setSpecies(person.species)])));
  // });


  // useEffect(() => {
  //    getPeople();
  //   .then(function (response) {
  //     setCharacters(response.data.results);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })
  // });

  // response.map((data) => axios.get(data.homeworld));
  // .then(function (response) {
  //   setHome(response);
  // })

 
  // map through response
  // call each one
  // assign value to home 



  return (
    <div>
     <Header />
     <SearchBar />
     {/* <CharacterList list={characters}/> */}
     <button>Click</button>
    </div>
  );
}

export default App;
