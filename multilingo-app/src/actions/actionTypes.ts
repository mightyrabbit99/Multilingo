import { Action as ReduxAction } from 'redux';

export interface IAction extends ReduxAction<any> {
  payload: any;
}

/** Session */
export const LOG_OUT = 'LOG_OUT';
export const LOG_IN = 'LOG_IN';
