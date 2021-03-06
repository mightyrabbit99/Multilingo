import { Card, createCard, CardType } from "./cards";

export type SearchResult = any;

class Dictionary {
  constructor(url: string) {
    this.dicturl = url;
    this.search = this.search.bind(this);
    this.searchInDict = this.searchInDict.bind(this);
    this.generateCards = this.generateCards.bind(this);
  }

  dicturl: string = "";

  generateCards(word: string, cardAdder: (card: Card) => void) {
    const res = this.searchInDict(word);
    if (res) {
      res[0].meaning.forEach((elem: any, i: number) => {
        if (elem.definition) {
          cardAdder(
            createCard(
              "dictionary autocreate",
              elem.definition,
              res.word,
              CardType.Expl
            )
          );
        }
        if (elem.synonyms) {
          let syn: string = elem.synonyms.shift();
          elem.synonyms.forEach((word: string) => {
            syn += ", " + word;
          });
          cardAdder(
            createCard("dictionary autocreate", syn, res.word, CardType.Expl)
          );
        }
      });
    }
  }

  searchInDict(word: string, lang: string = 'en'): SearchResult {
    let res: SearchResult;
    this.search(word, lang).then(result => {
      res = result;
    });
    let count = 0;
    while (!res && count < 200) {
      count++;
    }
    if (res) {
      return res;
    } else {
      return wordNotFound;
    }
  }

  search(word: string, lang: string = 'en') {
    return fetch(`/search/?define=${word}` + `&lang=${lang}`).then(s => {console.log(s);return s.json()});
  }
}

export const defaultDict = new Dictionary("/?define=");

(window as any).dicclass = defaultDict;

export const wordNotFound: SearchResult = {};

export default Dictionary;
