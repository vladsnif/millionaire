import React, {useContext, useMemo} from 'react';
import './App.css';
import {ReactComponent as Hand} from './img/hand.svg';
import Button from './components/Button/Button';
import Game from './Game';
import {GameContext} from './GameContext';
import GameState from './model/GameState';

function App() {
	const { setGameState = ()=>{}, gameState, currentPrize, setLevel = ()=>{}  } = useContext(GameContext) ?? {};
	return <>{useMemo(function () {
		const onButtonClick = function () {
			setGameState(GameState.Start);
			setLevel(0);
		};
		switch (gameState) {
		case GameState.Begin:
			return <div className="App">
				<div className="hand"><Hand/></div>
				<div className="name-and-btn"><span>Who wants to be a millionaire?</span> <Button
					onClick={onButtonClick}>Start</Button></div>
			</div>;
		case GameState.Start:
			return <Game/>;
		case GameState.End:
			return  <div className="App end">
				<div className="hand"><Hand/></div>
				<div className="name-and-btn">
					<div className="summary">
						<span className="score">Total score:</span>
						<span>${currentPrize} earned</span>
					</div>
					<Button onClick={onButtonClick}>Try again</Button>
				</div>
			</div>;
		default: return <></>;
		}
	}, [currentPrize, gameState, setGameState, setLevel])}</>;
}

export default App;