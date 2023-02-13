import AnswerOption from '../AnswerOption/AnswerOption';
import React, {useContext, useState} from 'react';
import {GameContext} from '../../GameContext';
import {ReactComponent as Close} from '../../img/close.svg';
import {ReactComponent as Open} from '../../img/open.svg';
import './Prizes.css';

export default function Prizes() {
	let {prizes = [], currentPrize = 500} = useContext(GameContext) ?? {};
	let [open, setOpen] = useState<boolean>(false);
	let onClick = function () {
		setOpen(open => !open);
	};
	return <>
		{open && <button onClick={onClick} className="btn-prize"><Close/></button>}
		{!open && <button onClick={onClick} className="btn-prize"><Open/></button>}
		<ul className={`prizes ${open ? 'open' : ''}`}>
			{prizes.map((prize) => {
				return <AnswerOption key={prize} prize={prize} disabled={prize < currentPrize}
					active={prize === currentPrize}/>;
			})
			}
		</ul>
	</>;
}