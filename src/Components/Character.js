import React from 'react';

const Character = (props) => {
	// const [homeWorld, setHomeWorld] = useState('');
	// const [species, setSpecies] = useState('Human');
	// const [mass, setMass] = useState('NA');

	// const peopleSpecies = async () => {
	//   if(props.species.length < 1) {
	//     return species;
	//   } else {
	//     const { data } = await axios.get(props.species);
	//     setSpecies(data.name);
	//   }
	//   if(props.mass > 1) {
	//      setMass(props.mass);
	//   }
	// }

	return (
		<tr>
			<th>{props.name}</th>
			<th>{props.birthYear}</th>
			<th>{props.height}</th>
			<th>{props.mass}</th>
			<th>{props.homeworld}</th>
			<th>{props.species}</th>
		</tr>
	);
};

export default Character;
