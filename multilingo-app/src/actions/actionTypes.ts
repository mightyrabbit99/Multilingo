import { Action as ReduxAction } from "redux";

export interface IAction extends ReduxAction {
  payload: any;
}

/** Session */
export const LOG_OUT = "LOG_OUT";
export const LOG_IN = "LOG_IN";
export const BACK_TO_MAIN = "BACK_TO_MAIN";
export const TO_TEST = "TO_TEST";
export const SELECT_DECK = "SELECT_DECK";
export const ADD_DECK = "ADD_DECK";
export const SELECT_CARD = "SELECT_CARD";
export const ADD_CARD_TO_SELECTED_DECK = "ADD_CARD_TO_SELECTED_DECK";
export const SAVE_TEST_SETTINGS = "SAVE_SETTINGS";

/** Backend */
export const RECEIVE_DECKS_DATA = "RECEIVE_DECKS_DATA";
export const UPDATE_DATABASE_DECKS = "UPDATE_DATABASE_DECKS";
export const DELETE_DECK = "DELETE_DECK";
export const DELETE_CARD_FROM_DECK = "DELETE_CARD_FROM_DECK";

/** User */
export const GO_TO_LOGIN = "GO_TO_LOGIN";

/** Dict */
export const INSERT_DICT_URL = "INSERT_DICT_URL";
export const START_SEARCH_WORD = "START_SEARCH_WORD";
export const WORD_SEARCHED = "WORD_SEARCHED";
export const DISP_AUTOGEN_CARDS = "DISP_AUTOGEN_CARDS";
