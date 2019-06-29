import {Card, createCard } from './cards'
import { forStatement } from '@babel/types';
//QNAs

export enum QuestionType {
  MCQ = "MCQ",
  Fillinblanks = "Fill-in-blanks",
  Rearrange = "Rearrange"
}

export type Comment = {
  date: number;
  content: string;
};

export class Answer {
	constructor(origin: Card, checkAnswer: (ans: string) => boolean) {
		this.origin = origin;
		this.getMark = ((ans: string) => {
			this.marked = true;
			return checkAnswer(ans);
		}).bind(this);
		this.getAnsCard = () => this.marked ? origin : null;
		this.marked = false;
	}
	origin: Card;
	tips?: string;
	marked: boolean;
	getMark: (ans: string) => boolean;
	getAnsCard: () => Card | null;
};

function shuffle<T>(array: T[]) {
	for(let i = 0; i < array.length; i++) {
		let pos = Math.floor(Math.random() * array.length);
		let temp = array[pos];
		array[pos] = array[i];
		array[i] = temp;
	}
}

function shuffleArray<T> (array: T[]): T[] {
	const n = array.length;
	const half = Math.floor(n / 2);
	const left = array.slice(0, half);
	const right = array.slice(half, array.length);
	shuffle(left);
	shuffle(right);
	const res = [];
	for(let i = 0; i < half; i++) {
		res[2 * i] = left[i];
		res[2 * i + 1] = right[i];
	}
	return res;
}

export class Question {
	constructor(type: QuestionType, question: Card | string, answer: Answer, options?: (Card | string)[]) {
		if(question instanceof Card) {
			this.questionCard = question;
		} else {
			this.question = (question as string);
		}
		if(options && options[0] instanceof Card) {
			this.option = options.map((item: Card) => item.back);
		}
		this.type = type;
		this.answer = answer;
		this.getQues = this.getQues.bind(this);
	}

	getQues(): string | string[] {
		if(!this.question) {
			switch(this.type) {
				case QuestionType.MCQ : {
					this.question = 
						this.questionCard.type === "Explanation" 
							?	this.questionCard.front
							: this.questionCard.front.replace(this.questionCard.back, "__________");
					break;
				}
				case QuestionType.Fillinblanks : {
					if(this.questionCard.type === "Example") {
						this.question = this.questionCard.front.replace(this.questionCard.back, "__________");
					}
					break;
				}
				case QuestionType.Rearrange : {
					if(this.questionCard.type === "Example") {
						const textArray: string[] = this.questionCard.front.split(" ");
						this.question = shuffleArray(textArray);
					}
					break;
				}
			}
		}
		return this.question;
	}

  type: QuestionType;
	difficulty: number = 0;
	option?: string[];
	questionCard: Card;
  question: string | string[] = '';
	answer: Answer;
};

type QuestionGeneratorSettings = {
	SameCategory: boolean;
	cards: Card[];
	MCQ: {
		noOfQuestion: number;
		noOfOption: number;
	}
	Fillinblanks: {
		noOfQuestion: number;
		Withoptions: boolean;
		noOfOption?: number;
		Casesensitive: boolean;
	}
	Rearrange : {
		noOfQuestion: number;
	}
	[particulars: string]: any;
}

function popRandom<T>(array: T[]): T {
	return array.splice(Math.floor(Math.random() * array.length), 1)[0];
}

export class QuestionGenerator {
	constructor(settings: QuestionGeneratorSettings) {
		this.settings = settings 
		this.makeMCQ = this.makeMCQ.bind(this);
		this.makeFillInBlanks = this.makeFillInBlanks.bind(this)
	}
	private settings: QuestionGeneratorSettings;

	makeMCQ(questionCard: Card, optionCard: Card[]) {
		const ans = new Answer(questionCard, (ans: string) => ans === questionCard.back)
		return new Question(QuestionType.MCQ, questionCard, ans, optionCard);
	}

	makeFillInBlanks(questionCard: Card, optionCard: Card[]) {
		if(questionCard.type !== "Example") {
			return;
		}
		const ans = new Answer(questionCard, (ans: string) => ans === questionCard.front)
		return new Question(QuestionType.Fillinblanks, questionCard, ans, optionCard);
	}

	makeRearrange(questionCard: Card) {
		if(questionCard.type !== "Example") {
			return;
		}
		const ans = new Answer(questionCard, (ans: string) => ans === questionCard.front)
		return new Question(QuestionType.Rearrange, questionCard, ans);
	}

	generateQuestions(): Question[] {
		let ques: Question[] = [];
		let { MCQ, Fillinblanks, Rearrange, cards } = this.settings;
		let totalNo = MCQ.noOfQuestion + Fillinblanks.noOfQuestion + Rearrange.noOfQuestion;
		if(totalNo <= cards.length) {
			for(let i = 0; i < totalNo; i++) {
				let card = cards[i];
				cards.splice(i, 1);
				let options = [];
				for(let j = 0; j < MCQ.noOfOption; j++) {
					let idx = Math.round(Math.random() * cards.length);
					options.push(cards[idx]);
					cards.splice(idx, 1);
				}
				for(let card in options) {
					options.push(card);
				}				
				ques.push(this.makeMCQ(card, options));
			}
		}
		return ques;
	}

}
