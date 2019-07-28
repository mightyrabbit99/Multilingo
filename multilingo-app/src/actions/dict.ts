import * as actionTypes from "./actionTypes";
import Dictionary, { SearchResult } from "../extension/dict";
import { Card } from "../extension/cards";

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

export const newCardsGenerated = (cards: Card[]) => ({
	type: actionTypes.DISP_AUTOGEN_CARDS,
	payload: {
		newCards: cards
	}
})
