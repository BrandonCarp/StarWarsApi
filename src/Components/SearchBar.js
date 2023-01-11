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
    const data = await axios.get(`/api/people/?search=${personSearch}`);

    return data.data.results[0];
  };

  const submitSearch = (e) => {
    e.preventDefault();
    findCharacter(personSearch)
      .then(fetchAuxilaryDataForPerson)
      .then(setFoundperson);

    clearForm(e);
  };

  const clearForm = (e) => {
    e.preventDefault();
    setPersonSearch("");
  };

  return (
    <form onSubmit={submitSearch} className="relative mx-auto container">
      <div className="mb-2 flex flex-col items-center">
        <h3 className=" mb-1 font-bold text-white text-1xl lg:text-2xl  pb-5">
          Search Your Favorite Character
        </h3>

        <input
          className="bg-starYellow rounded text-spaceBlack font-bold border-2 border-spaceBlack focus:none "
          type="text"
          value={personSearch}
          onChange={(e) => setPersonSearch(e.target.value)}
          placeholder=""
        />
        <button className="  bg-starYellow text-spaceBlack font-bold px-4 py-2 rounded-full baseline md:mb-0 hover:bg-spaceBlack my-5  hover:text-starYellow">
          Search
        </button>
      </div>
      <SearchedCharacter foundPerson={foundPerson} />
    </form>
  );
};

export default SearchBar;
