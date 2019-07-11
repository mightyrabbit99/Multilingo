//import { ActionCreator } from 'redux';

import * as actionTypes from "./actionTypes";
import { Card, CardDeck, defaultDeck } from "../extension/cards";
import { QuestionGeneratorSettings } from "../extension/questions";

export const logOut = () => ({
  type: actionTypes.LOG_OUT
});

export const backToMain = () => ({
  type: actionTypes.BACK_TO_MAIN
});

export const toTest = () => ({
	type: actionTypes.TO_TEST
});

/** Deck */

export const selectDeck = (deck: CardDeck = defaultDeck) => ({
  type: actionTypes.SELECT_DECK,
  payload: {
    selectedDeck: deck
  }
});

export const addDeck = (deck: CardDeck) => ({
  type: actionTypes.ADD_DECK,
  payload: {
    deck: deck
  }
});

/** Card */

export const addCardToDeck = (card: Card) => {
	return ({
	type: actionTypes.ADD_CARD_TO_SELECTED_DECK,
	payload: {
		card: card
	}
});}

/** Test */

export const saveTestSettings = (settings: QuestionGeneratorSettings) => {
	return ({
		type: actionTypes.SAVE_TEST_SETTINGS,
		payload: {
			settings: settings
		}
	});
};