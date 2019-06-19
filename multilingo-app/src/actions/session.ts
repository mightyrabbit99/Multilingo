//import { ActionCreator } from 'redux';

import * as actionTypes from './actionTypes';
import { CardDeck } from '../extension/cards';



export const logOut = () => ({
  type: actionTypes.LOG_OUT
});

export const clearSelectedDeck = () => ({
	type: actionTypes.CLEAR_SELECTED_DECK
})

export const selectDeck = (deck: CardDeck) => ({
	type: actionTypes.SELECT_DECK,
	payload: {
		selectedDeck: deck
	}
})