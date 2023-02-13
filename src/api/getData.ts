import questionsJSON from './questions.json';
import Question from '../model/Question';

export default function getData() {
	return new Promise((resolve: (value: Array<Question>) => void) => resolve(questionsJSON));
}