import { Reducer } from 'redux';

import { defaultCardsState, ICardsState } from './states';

export const reducer: Reducer<ICardsState> = (state = defaultCardsState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};