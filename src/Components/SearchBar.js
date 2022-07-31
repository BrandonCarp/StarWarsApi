import axios from "axios";
import React, { useState } from "react";
import { fetchSearch } from "../Services/fetchSearch";

// lift the state up of what i search here, insert the search link similar to how done on fetchPeople. Then use fetchauxilarydata for each search

const SearchBar = () => {
  const [personSearch, setPersonSearch] = useState("");
  const [searchedCharacter, setSearchedCharacter] = useState([]);

  const Default_Species = "Human";

  const fetchAuxilaryDataForSearchedPerson = async (person) => {
    const [homeWorldName, species] = await Promise.all([
      axios.get(person.homeworld).then(({ data }) => data.name),
      person.species.length
        ? axios.get(person.species[0].then(({ data }) => data.name))
        : Promise.resolve(Default_Species),
    ]);
    console.log(person);
    return {
      ...person,
      homeWorldName,
      species,
    };
  };

  const submitSearch = async (e) => {
    e.preventDefault();

    const searchData = fetchSearch(personSearch);
    await fetchAuxilaryDataForSearchedPerson(searchData).then(
      setSearchedCharacter
    );
  };

  const clearForm = (e) => {
    e.preventDefault();

    console.log(searchedCharacter);
  };

  return (
    <form onSubmit={submitSearch}>
      <h3>Search Your Favorite Star Wars Character</h3>
      <input
        type="text"
        value={personSearch}
        onChange={(e) => setPersonSearch(e.target.value)}
        placeholder="Try Searching Han Solo"
      />
      <button onClick={clearForm}>Search</button>
      <h1>{searchedCharacter}</h1>
    </form>
  );
};

export default SearchBar;
