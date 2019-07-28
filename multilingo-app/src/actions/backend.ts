import * as actionTypes from "./actionTypes";

import { CardDeck, Card } from "../extension/cards";

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

export const deleteCardFromDeck = (data: Card, deck: CardDeck) => {
  deck.deleteCard(data);
  return {
    type: actionTypes.DELETE_CARD_FROM_DECK,
    payload: {
      deck: deck
    }
  };
};
