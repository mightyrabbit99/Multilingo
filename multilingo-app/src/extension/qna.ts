 import { Card, QuestionType, Question } from './types';
  
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
    return undefined;
  }
}

function createMCQ(cards: Card[], questioned: Card = popRandom(cards), noOfOptions: number = 4) {
  if(noOfOptions > cards.length || noOfOptions < 1) {
    return undefined;
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
  if(array.length === 0) return undefined;
  return array.splice(Math.floor(Math.random() * array.length), 1)[0];
}
