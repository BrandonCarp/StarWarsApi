import React, {useEffect, useState} from "react";
import "./Home.css"
import CharacterList from "./components/CharacterList";
import getPage from "../../shared/hooks/getPage.jsx"
import axios from "axios";
import Loading from "../../shared/components/Loading/Loading";

const DEFAULT_SPECIES = 'Human';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)
    const [characters, setCharacters] = useState(null)

    function backPage() {
        setCurrentPage(Math.max(1, currentPage - 1));
    }

    function forwardPage() {
        setCurrentPage(currentPage + 1);
    }

    async function handlePeopleData(person) { //Taken from @codyseibert
        const [homeWorldName, species] = await Promise.all([
            axios.get(person.homeworld).then(({data}) => data.name),
            person.species.length ?
                axios.get(person.species[0]).then(({data}) => data.name) :
                Promise.resolve(DEFAULT_SPECIES)
        ]).catch(e => console.log(e.message))
        return {
            ...person,
            homeWorldName,
            species,
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getPage(currentPage).then(people => Promise.all(people.map(handlePeopleData))).then(list => {
            setCharacters(list);
            setIsLoading(false)
        });
    }, [currentPage])

    if (isLoading) {
        return <Loading/>
    }
    return (
        <div className="Home">
            <CharacterList list={characters}/>
            <h4>Real Buttons Below</h4>
            <button disabled={currentPage === 1} onClick={backPage}>Back Page</button>
            <button onClick={forwardPage}>Next Page</button>
        </div>
    )
}