import { Reducer } from 'redux';

import {
  IAction,
  LOG_OUT,
} from '../actions/actionTypes';
import { defaultSession, ISessionState } from './states';

export const reducer: Reducer<ISessionState, IAction> = (state = defaultSession, action: IAction) => {
  switch (action.type) {
    case LOG_OUT:
      return defaultSession;
    default:
      return state;
  }
};

export const isAcademyRe = new RegExp('^/academy.*', 'i');
