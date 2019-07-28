import { Reducer } from "redux";

import {
	START_SEARCH_WORD,
	WORD_SEARCHED,
	DISP_AUTOGEN_CARDS
} from "../actions/actionTypes";

import { defaultDictState, IDictState } from "./states";

export const reducer: Reducer<IDictState> = (
  state = defaultDictState,
  action: any
) => {
	switch (action.type) {
		case START_SEARCH_WORD : {
			return {
				...state,
				searched: false,
				newCards: []
			}
		}

		case WORD_SEARCHED : {
			return {
				...state,
				searched: true,
				searchResult: action.payload.res
			}
		}

		case DISP_AUTOGEN_CARDS : {
			return {
				...state,
				newCards: action.payload.newCards
			}
		}

		default: return state;
	}
}