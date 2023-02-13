import Answer from './Answer';

export default interface Question {
    question: string,
    answers: Array<Answer>,
    amount: number
};
