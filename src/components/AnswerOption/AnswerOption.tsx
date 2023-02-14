import React, {useMemo} from 'react';
import './AnswerOption.css';

type Props = { option?: string, className?: string, countOfCorrect?: number, answer?: string, prize?: number, onClick?: () => void, disabled?: boolean, active?: boolean };
export default function AnswerOption({
	option = '',
	className = '',
	answer = '',
	prize,
	onClick,
	disabled,
	active
}: Props) {
	return useMemo(() => <li
		className={`answer ${disabled ? 'disabled' : ''}${active ? 'active' : ''} ${className}`}
		onClick={onClick}>
		<span className="content"> <span className="variant">{option} </span>{answer}</span>
		<span className="prize">{prize ? '$' + prize.toLocaleString() : ''}</span>
		<div className={'answer-option'}>
		</div>
	</li>,
	[disabled, active, className, onClick, option, answer, prize]);
}