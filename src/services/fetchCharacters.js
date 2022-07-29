import axios from 'axios';
import { useEffect, useState } from 'react';

const API_URL = process.env.API_URL || 'https://swapi.dev/api';

export function useCharacters(page) {
	// Why we do this is cause it's more clean to implement this way
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		// Incase we switch page we don't wanna keep making requests for info about the outdated characters
		let cancel = false;

		// Reason why we do this is to have the most necessary info about the characters ready as fast as possible,
		// This is still not ideal as when we cancel we immediately cancel any HTTP requests performed by axios but then we are getting really nitpicky
		(async () => {
			let newCharacters = await fetchPeople(page);
			if (cancel) return;
			setCharacters(newCharacters);

			newCharacters = await fetchHomeworlds(newCharacters);
			if (cancel) return;
			setCharacters(newCharacters);

			newCharacters = await fetchSpecies(newCharacters);
			if (cancel) return;
			setCharacters(newCharacters);
		})();

		// Page switching, cancel any pending requests
		return () => (cancel = true);
	}, [page]);

	// The more sensible and boring approach
	/* useEffect(() => {
        let newCharacters = await fetchPeople(page);
        newCharacters = await fetchHomeworlds(newCharacters);
        newCharacters = await fetchSpecies(newCharacters);
        setCharacters(newCharacters);
    }, [page]); */

	return [characters];
}

export async function fetchSpecies(people) {
	// We do this because we don't want duplicate requests for the same species
	const speciesURLs = [...new Set(people.map((person) => person.species))];
	const species = [];

	// Request all unique species for this page, we could to improve perfomance use some kind of cache
	// However using a cache might return invalid data and would require a overcomplicated solution to do, making these requests work for now
	for (let i = 0; i < speciesURLs.length; i++) {
		const URL = speciesURLs[i];

		// Since we don't want species to undefined we set them to human
		// If we do get a human we will make it replace the url with the same name (explained in the end of the function)
		if (URL === 'Human') {
			species.push(['Human', 'Human']);
			continue;
		}

		// Make the request and store the info so we know which url should change to what species
		const { data } = await axios.get(URL);
		species.push([URL, data.name]);
	}

	// Now we map all the new names to the old urls
	// BEWARE: A undefined URL might cause this to fail, if you for some reason introduce such a bug, PLEASE make it return some default value
	return people.map((person) => {
		return {
			...person,
			species: species.find((url) => url[0] === person.species)[1],
		};
	});
}

export async function fetchHomeworlds(people) {
	// Get all the unique homeworlds for this page
	const homeworldURLs = [...new Set(people.map((person) => person.homeworld))];
	const homeworlds = [];

	for (let i = 0; i < homeworldURLs.length; i++) {
		const URL = homeworldURLs[i];
		const { data } = await axios.get(URL);
		homeworlds.push([URL, data.name]);
	}

	// Essentially do the same as above but for homeworlds
	return people.map((person) => {
		return {
			...person,
			homeworld: homeworlds.find((url) => url[0] === person.homeworld)[1],
		};
	});
}

export async function fetchPeople(page) {
	const { data } = await axios.get(`${API_URL}/people?page=${page}`);

	// Assuming the old script was correct and people can only have 1 species (I'm saying this cause the API returns an array)
	// So we get the first species (if any) and set it as a string value instead, defaults to human if no url was provided
	return data.results.map((person) => {
		person.species = person.species[0];
		if (person.species === undefined) person.species = 'Human';
		return person;
	});
}
