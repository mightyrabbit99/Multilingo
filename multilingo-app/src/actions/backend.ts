import * as actionTypes from "./actionTypes";

import {
  CardDeck,
  Card,
  CardCollection,
  cardToJSON,
  exampleExplCard1,
  CardType,
  exampleExplCard2,
  exampleExplCard3,
  exampleExplCard4,
  createCard
} from "../extension/cards";

export const receiveDecksData = (data: CardDeck[]) => {
  return {
    type: actionTypes.RECEIVE_DECKS_DATA,
    payload: {
      decks: data
    }
  };
};

export const updateDatabaseDecks = (
  data: {
    cards: {
      category: string;
      front: string;
      back: string;
      type: CardType;
      originalCard: null;
      dateAdded: number;
      comments: never[];
      description: string;
      info: {
        lastRevised: number;
        lastResult: number;
        correct: number;
        wrong: number;
        asked: number;
      };
    }[];
    info: {
      [key: string]: any;
      name: string;
      category: string;
      dateAdded: number;
    };
  }[]
) => {
  /*
  used this to add cards into decks
  data[0].cards.push(cardToJSON(exampleExplCard1));
  data[0].cards.push(cardToJSON(exampleExplCard2));
  data[0].cards.push(cardToJSON(exampleExplCard3));
  data[0].cards.push(cardToJSON(exampleExplCard4));
  data[0].cards.push(cardToJSON(createCard("a", "run off", "flee")));
  data[0].cards.push(cardToJSON(createCard("b", "penalize", "confiscate")));
  */
  return {
    type: actionTypes.UPDATE_DATABASE_DECKS,
    payload: {
      decks: data
    }
  };
};
