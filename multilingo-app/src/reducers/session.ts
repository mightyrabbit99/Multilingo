import { Reducer } from 'redux';

import {
	CLEAR_SELECTED_DECK,
	SELECT_DECK
} from '../actions/actionTypes'

import { defaultSessionState, ISessionState } from './states';
import { defaultDeck } from '../extension/cards';

export const reducer: Reducer<ISessionState> = (state = defaultSessionState, action: any) => {
  switch (action.type) {
		case CLEAR_SELECTED_DECK : 
			return {
				...state,
				selectedDeck: defaultDeck
			};
		case SELECT_DECK : 
			return {
				...state,
				selectedDeck: action.payload.selectedDeck
			}
    default:
      return state;
  }
};