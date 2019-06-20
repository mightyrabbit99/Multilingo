import { Reducer } from 'redux';

import {
	SELECT_DECK
} from '../actions/actionTypes'

import { defaultSessionState, ISessionState } from './states';

export const reducer: Reducer<ISessionState> = (state = defaultSessionState, action: any) => {
  switch (action.type) {
		case SELECT_DECK : 
			return {
				...state,
				selectedDeck: action.payload.selectedDeck
			}
    default:
      return state;
  }
};