//import { ActionCreator } from 'redux';

import * as actionTypes from "./actionTypes";
import { CardDeck, defaultDeck } from "../extension/cards";
import { type } from "os";

export const logOut = () => ({
  type: actionTypes.LOG_OUT
});

export const backToMain = () => ({
  type: actionTypes.BACK_TO_MAIN
});

export const selectDeck = (deck: CardDeck = defaultDeck) => ({
  type: actionTypes.SELECT_DECK,
  payload: {
    selectedDeck: deck
  }
});

export const addDeck = (name: string) => ({
  type: actionTypes.ADD_DECK,
  payload: {
    deckName: name
  }
});

export const receiveDecksData = (data: CardDeck[]) => {
  return {
    type: actionTypes.RECEIVE_DECKS_DATA,
    payload: {
      decks: data
    }
  };
};
