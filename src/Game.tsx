import React, {useContext, useMemo} from 'react';
import './Game.css';
import Prizes from './components/Prizes/Prizes';
import AnswerList from './components/AnswerList/AnswerList';
import {GameContext} from './GameContext';


export default function Game(){
	let { currentQuestion } = useContext(GameContext) ?? {};
	return <>{useMemo(function () {
		return currentQuestion && <div className="game">
			<div className="question-answers">
				<div className="question">{currentQuestion.question}</div>
				<AnswerList/>
			</div>
			<Prizes/>
		</div>;
	}
	, [currentQuestion])}</>;
}