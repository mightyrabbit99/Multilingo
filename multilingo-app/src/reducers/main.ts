import { Reducer } from 'redux';

import {
  LOG_OUT
} from '../actions/actionTypes';
import { defaultMain, MainState } from './states';

export const reducer: Reducer<MainState> = (state = defaultMain, action: any) => {
  switch (action.type) {
    case LOG_OUT:
      return defaultMain;
    default:
      return state;
  }
};

