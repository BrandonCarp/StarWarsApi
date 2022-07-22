import axios from "axios";

export default async function getPage(pageToGet) {
    const peopleCollection = new Map(JSON.parse(localStorage.getItem("peopleData")))

    if (peopleCollection.has(pageToGet)) {
        console.log(peopleCollection.get(pageToGet));
        return peopleCollection.get(pageToGet)
    }

    const {data} = await axios.get(`https://swapi.dev/api/people/?page=${pageToGet}`).catch(e => console.log(e));

    peopleCollection.set(pageToGet, data.results);
    localStorage.setItem("peopleData", JSON.stringify(Array.from(peopleCollection.entries())))

    return data.results
}