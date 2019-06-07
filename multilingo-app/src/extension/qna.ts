 import { Card, QuestionType, Question } from './types';
 import { createCard } from './cards';
  
export function createRandomQuestion(cards: Card[], type: QuestionType): Question | undefined {
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
  return undefined;
}

const sampleMCQ: Question = {
  type: QuestionType.MCQ,
  difficulty: 0,
  question: ["aaa"],
  answer: {
    options: {
      allOptions: ["options"],
      cards: []
    },
    checkAnswer: (answer: string) => answer === "sss"
  },
  questionedCard: createCard("type", ["front"], ["back"])
}

function createMCQ(cards: Card[], questioned: Card = popRandom(cards), noOfOptions: number = 4) {
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

function popRandom<T>(array: T[]): T {
  return array.splice(Math.floor(Math.random() * array.length), 1)[0];
}
