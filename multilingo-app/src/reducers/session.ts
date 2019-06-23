import { Reducer } from "redux";

import {
  SELECT_DECK,
  ADD_DECK,
  IAction,
  RECEIVE_DECKS_DATA
} from "../actions/actionTypes";

import { CardDeck } from "../extension/cards";

import { defaultSessionState, ISessionState } from "./states";

export const reducer: Reducer<ISessionState> = (
  state = defaultSessionState,
  action: any
) => {
  switch (action.type) {
    case SELECT_DECK:
      return {
        ...state,
        selectedDeck: action.payload.selectedDeck
      };

    case RECEIVE_DECKS_DATA:
      return {
        ...state,
        decks: action.payload.decks
      };

    case ADD_DECK:
      return {
        ...state,
        newDeck: new CardDeck(action.payload.deckName)
      };
    default:
      return state;
  }
};
