import React, {Dispatch, SetStateAction, useEffect, useMemo, useState} from 'react';
import Question from './model/Question';
import getData from './api/getData';
import GameState from './model/GameState';

type GameContextType = { currentPrize: number, questions: Array<Question>, currentQuestion: Question, prizes: Array<number>, gameState: GameState, setGameState: Dispatch<SetStateAction<GameState>>, level: number, setLevel: Dispatch<SetStateAction<number>>};
export const GameContext = React.createContext<GameContextType | null>(null);

export function GameProvider({children}: { children: JSX.Element | undefined }) {
	const [gameState, setGameState] = useState(GameState.Begin);
	const [level, setLevel] = useState<number>(0);
	const [questions, setQuestions] = useState<Array<Question>>([]);
	const prizes: Array<number> = useMemo(() => questions.map(({amount}) => amount), [questions]);

	useEffect(function () {
		getData().then((response) => {
			setQuestions(response);
		});
	}, [questions]);
	const currentPrize = useMemo(() => prizes[level], [level, prizes]);
	const currentQuestion: Question = useMemo(() => questions[level], [level, questions]);
	return <GameContext.Provider value={{
		questions,
		currentPrize, currentQuestion, prizes, gameState, setGameState, level, setLevel
	}}>{children}</GameContext.Provider>;
}