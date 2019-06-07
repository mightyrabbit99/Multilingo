//QNAs

export enum QuestionType {
    MCQ = 'MCQ',
    Fillinblanks = 'Fill-in-blanks',
    Rearrange = 'Rearrange'
}

export type Question = {
    type: QuestionType;
    difficulty: number;
    question: string[];
    answer: Answer;
    info?: string;
    questionedCard: Card;
}

export type Answer = {
  tips?: string;
  options?: Option;
  checkAnswer: (answer: string) => boolean;
  answer?: string;
}

export type Option = {
    allOptions: string[],
    cards: Card[]
}

export type Comment = {
    date: number;
    content: string;
}

//Cards 

export type Card = {
    dateAdded: number;
    comments: Comment[];
    info: {
        lastRevised: number;
        lastResult: number;
        correct: number;
        wrong: number;
        asked: number;
    };
    type: string;
    front: string[];
    back: string[];
}

export type CardCollection = {[type: string]:Card[]}