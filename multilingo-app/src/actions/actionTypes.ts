import { Action as ReduxAction } from "redux";

export interface IAction extends ReduxAction {
  payload: any;
}

/** Session */
export const LOG_OUT = "LOG_OUT";
export const LOG_IN = "LOG_IN";
export const BACK_TO_MAIN = "BACK_TO_MAIN";
export const SELECT_DECK = "SELECT_DECK";
export const ADD_DECK = "ADD_DECK";
export const SELECT_CARD = "SELECT_CARD";
export const ADD_CARD_TO_SELECTED_DECK = "ADD_CARD_TO_SELECTED_DECK";

/** Backend */
export const RECEIVE_DECKS_DATA = "RECEIVE_DECKS_DATA";

/** User */
export const GO_TO_LOGIN = "GO_TO_LOGIN";
