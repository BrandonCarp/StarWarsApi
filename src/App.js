import { useReducer } from 'react';
import CharacterList from './Components/CharacterList';
import { useCharacters } from './services/fetchCharacters';

export default function App() {
	// I acually havent used reducers yet, unsure if this is the optimal way of handling page switches but it's an interesting way to do it nonetheless
	const [page, setPage] = useReducer((state, action) => {
		switch (action) {
			case 'prev':
				return Math.max(1, state - 1);
			case 'next':
				return state + 1;
			default:
				throw new Error(`Invalid page action: ${action}`);
		}
	}, 1);

	// Call our custom hook to get the characters, find source in src\services\fetchCharacters.js
	const [characters] = useCharacters(page);

	return (
		<div>
			<CharacterList list={characters} />
			<h4>Real Buttons Below</h4>
			<button onClick={() => setPage('prev')}>Previous Page</button>
			<button onClick={() => setPage('next')}>Next Page</button>
		</div>
	);
}
