import React from 'react';
import Character from './Character';

const CharacterList = (props) => {
	return (
		<>
			<div>
				<table style={{ textAlign: 'left' }}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Birth Year</th>
							<th>Height</th>
							<th>Mass</th>
							<th>Homeworld</th>
							<th>Species</th>
						</tr>
					</thead>
					<tbody>
						{props.list.map((data) => (
							<Character
								name={data.name}
								birthYear={data.birth_year}
								height={data.height}
								mass={data.mass}
								homeworld={
									!data.homeworld.startsWith('http')
										? data.homeworld
										: 'Loading...'
								}
								species={
									// Since we override the species with the url once finished, we have to check this to prevent weird info being displayed
									!data.species.startsWith('http') ? data.species : 'Loading...'
								}
								key={data.name}
							/>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default CharacterList;
