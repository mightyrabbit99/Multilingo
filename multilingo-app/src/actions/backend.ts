import * as actionTypes from "./actionTypes";

import { CardDeck } from "../extension/cards";

export const receiveDecksData = (data: CardDeck[]) => {
  return {
    type: actionTypes.RECEIVE_DECKS_DATA,
    payload: {
      decks: data
    }
  };
};

export const updateDatabaseDecks = (data: CardDeck[]) => {
  return {
    type: actionTypes.UPDATE_DATABASE_DECKS,
    payload: {
      decks: data
    }
  };
};

export const deleteDeck = (data: CardDeck) => {
  return {
    type: actionTypes.DELETE_DECK,
    payload: {
      deck: data
    }
  };
};
