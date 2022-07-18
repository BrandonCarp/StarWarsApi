import React from 'react'


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
    <div>
        <table>
        {/* <thead>
        <tr>
        <th>Name</th>
        <th>Birth Year</th>
        <th>Height</th>
        <th>Mass</th>
        <th>Homeworld</th>
        <th>Species</th>
        </tr>
        </thead> */}
        <tbody>
        <tr>
        <th>{props.name}</th>
        <th>{props.birthYear}</th>
        <th>{props.height}</th>
        <th>{props.mass}</th>
         <th>{props.homeWorld}</th>
        <th>{props.species}</th>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Character