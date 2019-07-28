import { Reducer } from "redux";

import {
  SELECT_DECK,
  ADD_DECK,
  RECEIVE_DECKS_DATA,
  ADD_CARD_TO_SELECTED_DECK,
  UPDATE_DATABASE_DECKS,
  DELETE_DECK,
  DELETE_CARD_FROM_DECK
} from "../actions/actionTypes";

import { defaultSessionState, ISessionState } from "./states";
import { Card, CardDeck } from "../extension/cards";

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
      action.payload.cards.forEach((c: Card) => {
        console.log(state.selectedDeck);
        state.selectedDeck.addCard(c);
      });
      return {
        ...state,
        newCard: action.payload.cards
      };
    case UPDATE_DATABASE_DECKS:
      return {
        ...state
      };
    case DELETE_DECK:
      let number = 0;
      for (number = 0; number < state.decks.length; number++) {
        if (
          state.decks[number].info.dateAdded ===
          action.payload.deck.info.dateAdded
        ) {
          state.decks.splice(number, 1);
          break;
        }
      }
      return {
        ...state
      };
    case DELETE_CARD_FROM_DECK:
      let i = 0;
      for (i = 0; i < state.decks.length; i++) {
        if (
          state.decks[i].info.dateAdded === action.payload.deck.info.dateAdded
        ) {
          state.decks[i] = action.payload.deck;
          break;
        }
      }
      return {
        ...state
      };
    default:
      return state;
  }
};
