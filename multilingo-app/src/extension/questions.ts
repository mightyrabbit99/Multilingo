import {Card, createCard } from './cards'
//QNAs

export enum QuestionType {
  MCQ = "MCQ",
  Fillinblanks = "Fill-in-blanks",
  Rearrange = "Rearrange"
}

export type Question = {
  type: QuestionType;
  difficulty: number;
  question: string;
  answer: Answer;
  info?: string;
  questionedCard: Card;
};

export type Answer = {
  tips?: string;
  options?: Option;
  checkAnswer: (answer: string) => boolean;
  answer?: string;
};

export type Option = {
  allOptions: string[];
  cards: Card[];
};

export type Comment = {
  date: number;
  content: string;
};

const sampleMCQ: Question = {
  type: QuestionType.MCQ,
  difficulty: 0,
  question: "aaa",
  answer: {
    options: {
      allOptions: ["options"],
      cards: []
    },
    checkAnswer: (answer: string) => answer === "sss"
  },
  questionedCard: createCard("type", "front", "back")
}

function createMCQ(cards: Card[], questioned: Card = popRandom(cards), noOfOptions: number = 4): Question {
  if(noOfOptions > cards.length || noOfOptions < 1) {
    return sampleMCQ;
  } else {
    let cardsCopy = cards.slice();
    let options = [questioned.back[0]];
    let optionCards = [questioned];
    if(cardsCopy.includes(questioned)) {
      cardsCopy.splice(cardsCopy.indexOf(questioned), 1);
    }
    for(let i = 1; i < noOfOptions; i++) {
      let chosen = popRandom(cardsCopy);
      options.push(chosen.back[0]);
      optionCards.push(chosen);
    }
    return {
      type: QuestionType.MCQ,
      difficulty: 0,
      question: questioned.front,
      answer: {
        options: {
          allOptions: options,
          cards: optionCards
        },
        checkAnswer: (answer: string) => answer === questioned.back[0]
      },
      questionedCard: questioned
    }
  }
}
/*
export function createRandomQuestion(cards: Card[], type: QuestionType): Question {
  switch(type) {
    case QuestionType.MCQ : {
      return createMCQ(cards);
    }
    case QuestionType.Fillinblanks : {

    }
    case QuestionType.Rearrange : {

    }
    default: {

    }
  }
  return null;
}
*/
function popRandom<T>(array: T[]): T {
  return array.splice(Math.floor(Math.random() * array.length), 1)[0];
}
