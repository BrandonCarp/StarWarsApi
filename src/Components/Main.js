import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacterList from "./CharacterList";


const Home = (props)=>{
    const [characters, setCharacters] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState("https://swapi.dev/api/people/");
    const [backPageUrl, setBackPageUrl] = useState(null);
    const [test, setTest] = useState([]);
    const [loading, setLoading] = useState(true)

    const fetchPeople = async () => {
        const { data } = await axios.get(nextPageUrl);
        setNextPageUrl(data.next);
        setBackPageUrl(data.previous);
        return data.results;
    }

    const backPage = async () => {
        const { data } = await axios.get(backPageUrl);
        setNextPageUrl(data.next);
        setBackPageUrl(data.previous);
        return data.results
    }


    // Get People
    async function getPeople(method) {
        setLoading(true)
        console.log("Getting People")
        const persons = await method();

        const homeWorldUrl= await Promise.all(
            persons.map((thing) => axios.get(thing.homeworld)),
        );

        const newPersons =  persons.map((person) => {
            return {
                ...person,
                homeworld: homeWorldUrl.find((url) => url.config.url === person.homeworld)
            };
        });

        const newPersons2 = newPersons.map((person) => {
            return {
                ...person,
                homeWorld: person.homeworld.data.name
            };
        });
        console.log("<<< People >>>", newPersons2)

        console.log("Getting Species")
        // const persons = await fetchPeople();
        const speciesUrl = await Promise.all(
            // filter by length to get all with [0] together since all are arrays of [0]
            // map to create array of each one with an array of [0]
            newPersons2
                .filter((thing) => thing.species.length)
                .map( (thing) =>  axios.get(thing.species[0]))
        );

        console.log("<<< Species URL >>>", speciesUrl)


        const newSwapi = newPersons2.map((person) => {
            return {
                ...person,
                species: speciesUrl.find((info) => info.data.url === person.species[0])
            };
        });

        console.log("<<< Species newSwapi >>>", newSwapi)

        const newSwapi2 = newSwapi.map((person) => {
            if(person.species === undefined){
                return {...person, species: 'Human'}
            } else {
                return {...person, species: person.species.data.name}
            }
        });
        setCharacters(newSwapi2);
        console.log("<<< Species newSawpi2 >>>", newSwapi2);
        // species.data.name
        setTest(newSwapi2);
        setLoading(false)
    }

    useEffect(() => {
        getPeople(fetchPeople).finally(()=>{
                setLoading(false);
                console.log(characters)
        })
    }, []);

    if(loading){
        console.log('Loading...')
        return <div>Loading...</div>
    }

    return (
        <div className="Home">
            {/* <Header /> */}
            <CharacterList  list={characters}/>
            <h4>Real Buttons Below</h4>
            <button disabled={backPageUrl === null} onClick={(e) => getPeople(backPage)}>Back Page</button>
            <button onClick={(e) => getPeople(fetchPeople)}>Next Page</button>
            <h3>Test Button</h3>
            <button onClick={(e) => console.log(test)}>Test</button>
        </div>
    )
}
export default Home;