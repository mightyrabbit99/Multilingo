import {Card, defaultCard, CardDeck, demonstrationDecks, CardType } from './cards'
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
			this.userAns = ans;
			this.marked = true;
			return checkAnswer(ans);
		});
		this.getAnsCard = () => this.marked ? origin : defaultCard;
		this.marked = false;
	}
	origin: Card;
	tips?: string;
	marked: boolean;
	userAns: string = "";
	getMark: (ans: string) => boolean;
	getAnsCard: () => Card;
};

function shuffle<T>(array: T[]) {
	for(let i = 0; i < array.length; i++) {
		let pos = Math.floor(Math.random() * (array.length - i)) + i;
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
		if(options) {
			if(options[0] instanceof Card) {
				this.option = (options as Card[]).map((item: Card) => item.back);
			} else {
				this.option = (options as string[]);
			}
		}
		this.type = type;
		this.answer = answer;
		this.getQues = this.getQues.bind(this);
	}

	getQues(): string | string[] {
		if(this.question === '') {
			switch(this.type) {
				case QuestionType.MCQ : {
					this.question = 
						this.questionCard.type === CardType.Expl
							?	this.questionCard.front
							: this.questionCard.front.replace(this.questionCard.back, "__________");
					break;
				}
				case QuestionType.Fillinblanks : {
					if(this.questionCard.type === CardType.Ex) {
						this.question = this.questionCard.front.replace(this.questionCard.back, "__________");
					}
					break;
				}
				case QuestionType.Rearrange : {
					if(this.questionCard.type === CardType.Ex) {
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
	questionCard: Card = defaultCard;
  question: string | string[] = '';
	answer: Answer;
};

export type QuestionGeneratorSettings = {
	SameCategory: boolean;
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

export const defaultGenSettings: QuestionGeneratorSettings = {
	SameCategory: true,
	MCQ: {
		noOfQuestion: 2,
		noOfOption: 2
	},
	Fillinblanks: {
		noOfQuestion: 2,
		Withoptions: false,
		Casesensitive: false
	},
	Rearrange : {
		noOfQuestion: 2
	}
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

	makeMCQ(questionCard: Card, allOptions: string[]) {
		let thisoptions: string[] = [];
		let option: string;
		let n = this.settings.MCQ.noOfOption;
		for(let j = 1; (j < n) && (allOptions.length > j); j++) {
			option = popRandom(allOptions);
			if(questionCard.back === option) {
				j--;
				continue;
			}
			thisoptions.push(option);
		}
		thisoptions.push(questionCard.back);
		shuffle(thisoptions);
		const ans = new Answer(questionCard, (ans: string) => ans === questionCard.back)
		return new Question(QuestionType.MCQ, questionCard, ans, thisoptions);
	}

	makeFillInBlanks(questionCard: Card, optionCard: string[]) {
		const ans = new Answer(questionCard, (ans: string) => ans === questionCard.front)
		return new Question(QuestionType.Fillinblanks, questionCard, ans, optionCard);
	}

	makeRearrange(questionCard: Card) {
		const ans = new Answer(questionCard, (ans: string) => ans === questionCard.front)
		return new Question(QuestionType.Rearrange, questionCard, ans);
	}

	generateQuestions(deck: CardDeck): Question[] {
		let ques: Question[] = [];
		let allCards = deck.cards.slice();
		let exampleCards = deck.collection.byType.Example.slice();
		let { MCQ, Fillinblanks, Rearrange } = this.settings;
		for(let i = 0; i < MCQ.noOfQuestion; i++) {
			ques.push(this.makeMCQ(popRandom(allCards), Object.keys(deck.collection.byBack)));
		}
		for(let i = 0; i < Fillinblanks.noOfQuestion; i++) {
			ques.push(this.makeFillInBlanks(popRandom(exampleCards), Object.keys(deck.collection.byBack)));
		}
		for(let i = 0; i < Rearrange.noOfQuestion; i++) {
			ques.push(this.makeRearrange(popRandom(exampleCards)));
		}
		shuffle(ques);
		(window as any).ques = ques;
		return ques;
	}

}
