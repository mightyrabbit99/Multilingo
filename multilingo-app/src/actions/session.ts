import { ActionCreator } from 'redux';

import * as actionTypes from './actionTypes';

export const logOut = () => ({
  type: actionTypes.LOG_OUT
});