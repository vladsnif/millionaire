import AnswerOption from '../AnswerOption/AnswerOption';
import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {GameContext} from '../../GameContext';
import Answer from '../../model/Answer';
import GameState from '../../model/GameState';
import './AnswerList.css';
const alphabet = Array.from(Array(26)).map((e, i) => i + 65).map((x) => String.fromCharCode(x));
export default function AnswerList() {
	const {
		setGameState = () => {},
		currentQuestion, setLevel = () => {
		}, questions = [], level
	} = useContext(GameContext) ?? {};
	const answers = useMemo(() => currentQuestion?.answers ?? [],[currentQuestion?.answers]);
	const countOfCorrect = answers?.filter(e => e.isCorrect).length;
	const [additionalClasses, setAdditionalClasses] = useState<{ [key: string]: string }>({});
	const [ selected, setSelected ] = useState<{[key: number]: Answer}>({});
	const selectedIds = useMemo(() => Object.keys(selected),[selected]);
	useEffect(function () {
		selectedIds.length && setAdditionalClasses(function (classes) {
			const additionalClasses = structuredClone(classes);
			selectedIds.forEach(function (id) {
				if(selectedIds.length !== countOfCorrect ){
					additionalClasses[id] = 'selected';
				} else {
					if (selected[+id].isCorrect) {
						additionalClasses[id] = 'selected correct';
					} else {
						additionalClasses[id] = 'selected incorrect';
					}
				}
			});
			return additionalClasses;
		});
	}, [countOfCorrect, selected, selectedIds]);

	const refresh = useCallback(function () {
		setAdditionalClasses({});
		setSelected({});
	},[]);

	useEffect(function () {
		if (selectedIds.length === countOfCorrect && Object.keys(additionalClasses).length) {
			setTimeout(function () {
				if (selectedIds.every((e) => selected[+e].isCorrect) && questions?.length-1 !== level) {
					setLevel(level => ++level);
					refresh();
				} else {
					setGameState(GameState.End);
					refresh();
				}
			}, 2500);
		}
	},[additionalClasses, countOfCorrect, level, questions?.length, refresh, selected, setGameState, setLevel, selectedIds]);

	return useMemo(() => <div className="answers">
		<ul className="answers-form">
			{answers?.map((answer, index) => {
				const onClick = function () {
					selectedIds.length !== countOfCorrect && setSelected((ans) =>{
						const clone = structuredClone(ans);
						clone[index] = answer;
						return clone;
					});
				};
				return <AnswerOption className={additionalClasses[index]} correct={answer.isCorrect} key={answer.answer}
					option={alphabet[index]} answer={answer.answer} onClick={ onClick}/>;
			})}
		</ul>
	</div>, [additionalClasses, answers, countOfCorrect, selectedIds.length]);
}