import * as actionTypes from "./actionTypes";

import { CardDeck } from '../extension/cards';

export const receiveDecksData = (data: CardDeck[]) => {
  return {
    type: actionTypes.RECEIVE_DECKS_DATA,
    payload: {
      decks: data
    }
  };
};