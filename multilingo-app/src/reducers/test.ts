import { Reducer } from 'redux';

import { defaultTestState, ITestState } from './states';

export const reducer: Reducer<ITestState> = (state = defaultTestState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};