import { Reducer } from "redux";

import {
  SELECT_DECK,
  ADD_DECK,
  RECEIVE_DECKS_DATA,
	ADD_CARD_TO_SELECTED_DECK
} from "../actions/actionTypes";

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
			state.decks.unshift(action.payload.deck);
      return {
        ...state,
        newDeck: action.payload.deck
			};
		case ADD_CARD_TO_SELECTED_DECK:
      return {
        ...state,
        newCard: action.payload.card
			};
    default:
      return state;
  }
};
