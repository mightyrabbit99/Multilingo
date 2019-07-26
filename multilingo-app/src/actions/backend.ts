import * as actionTypes from "./actionTypes";

import { CardDeck, Card, CardCollection } from "../extension/cards";

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
    cards: Card[];
    info: {
      [key: string]: any;
      name: string;
      category: string;
      dateAdded: number;
    };
  }[]
) => {
  return {
    type: actionTypes.UPDATE_DATABASE_DECKS,
    payload: {
      decks: data
    }
  };
};
