import { Action as ReduxAction } from 'redux';

export interface IAction extends ReduxAction {
    payload: any;
  }

/** Main */
export const LOG_OUT = 'LOG_OUT';
export const LOG_IN = 'LOG_IN';
