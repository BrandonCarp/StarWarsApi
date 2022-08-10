import axios from "axios";
import React, { useState } from "react";
import SearchedCharacter from "./SearchedCharacter";

const SearchBar = () => {
  const [personSearch, setPersonSearch] = useState("");
  const [foundPerson, setFoundperson] = useState([]);

  const Default_Species = "Human";

  const fetchAuxilaryDataForPerson = async (person) => {
    const [homeWorldName, species] = await Promise.all([
      axios.get(person.homeworld).then(({ data }) => data.name),
      person.species.length
        ? axios.get(person.species[0]).then(({ data }) => data.name)
        : Promise.resolve(Default_Species),
    ]);
    return {
      ...person,
      homeWorldName,
      species,
    };
  };

  const findCharacter = async () => {
    const data = await axios.get(
      `https://swapi.dev/api/people/?search=${personSearch}`
    );

    return data.data.results[0];
  };

  const submitSearch = (e) => {
    e.preventDefault();
    findCharacter(personSearch)
      .then(fetchAuxilaryDataForPerson)
      .then(setFoundperson);

    console.log(foundPerson);

    clearForm(e);
  };

  const clearForm = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={submitSearch} className="">
      <div className="ml-20 mb-2 ">
        <input
          className="ml-6 bg-starYellow rounded text-spaceBlack font-bold border-2 border-spaceBlack"
          type="text"
          value={personSearch}
          onChange={(e) => setPersonSearch(e.target.value)}
          placeholder="Try Searching Han Solo"
        />
        <button className="ml-3 bg-starYellow text-spaceBlack font-bold px-4 py-2 rounded-full baseline md:mb-0 hover:bg-spaceBlack hover:text-starYellow">
          Search
        </button>
      </div>
      <SearchedCharacter foundPerson={foundPerson} />
    </form>
  );
};

export default SearchBar;
