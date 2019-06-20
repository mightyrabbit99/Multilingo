import { Action as ReduxAction } from 'redux';

export interface IAction extends ReduxAction {
    payload: any;
  }

/** Session */
export const LOG_OUT = 'LOG_OUT';
export const LOG_IN = 'LOG_IN';
export const BACK_TO_MAIN = 'BACK_TO_MAIN';
export const SELECT_DECK = 'SELECT_DECK';
