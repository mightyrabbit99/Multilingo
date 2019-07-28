import * as actionTypes from "./actionTypes";
import Dictionary, { SearchResult } from "../extension/dict";

export const dictUrl = (url: string) => ({
  type: actionTypes.INSERT_DICT_URL,
  payload: {
    url: url
  }
});

export const searchingWord = (word: string, lang: string, dict: Dictionary) => ({
  type: actionTypes.START_SEARCH_WORD,
  payload: {
		word: word,
		lang: lang,
    dict: dict
  }
});

export const wordSearched = (meaning: SearchResult) => {
  console.log(meaning);
  return {
    type: actionTypes.WORD_SEARCHED,
    payload: {
      res: meaning
    }
  };
};
