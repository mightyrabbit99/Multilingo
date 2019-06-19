import { Action as ReduxAction } from 'redux';

export interface IAction extends ReduxAction {
    payload: any;
  }

/** Session */
export const LOG_OUT = 'LOG_OUT';
export const LOG_IN = 'LOG_IN';
export const CLEAR_SELECTED_DECK = 'CLEAR_SELECTED_DECK';
export const SELECT_DECK = 'SELECT_DECK';
