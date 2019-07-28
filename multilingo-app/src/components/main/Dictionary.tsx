import * as React from "react";
import { SearchResult, wordNotFound } from "../../extension/dict";

import { Input, Dropdown, Button, Modal } from "semantic-ui-react";
import WordCard from "../commons/WordCard";
import { Card } from "../../extension/cards";

export interface DictionaryProps {
  word: string;
  searched: boolean;
  searchResult: SearchResult;
  newCards: Card[];
  searchingWord: (word: string, lang: string) => void;
}

enum DictStatus {
  Main = "Main",
  Searched = "Searched"
}

type DictionaryState = {
  status: DictStatus;
  word: string;
  meaning: SearchResult;
  lang: string;
};

class Dictionary extends React.Component<DictionaryProps, DictionaryState> {
  constructor(props: DictionaryProps) {
    super(props);
    this.state = {
      status: props.word ? DictStatus.Searched : DictStatus.Main,
      word: props.word,
      meaning: wordNotFound,
      lang: "en"
    };
    this.dispMeaning = this.dispMeaning.bind(this);
  }

  dispMeaning() {
    const res = this.props.searchResult[0];
    (window as any).res = res;
    const wordNotFoundText = "FUCK YOU!!!!!!!!!!";
    const meaningComponent = () =>
      res ? (
        <div className="wordmeaning">
          <h2>{res.word}</h2>
          <h2>{res.phonetic}</h2>
          {Object.keys(res.meaning).map((s: string, i: number) => (
            <div className="expl" key={i}>
              <h3>{s}</h3>
              {res.meaning[s].map((a: any, i: number) => (
                <div className="meaningandexample" key={i}>
                  <p className="meaning">{a.definition}</p>
                  {a.example ? <p className="example-sentence">{a.example}</p> : null}
                  {a.synonyms
                    ? a.synonyms.map((ss: string, i: number) => (
                        <p className="synonyms" key={i}>
                          {ss}
                        </p>
                      ))
                    : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : null;
    return (
      <div className="meaning">
        {this.props.searched
          ? this.props.searchResult === wordNotFound
            ? wordNotFoundText
            : meaningComponent()
          : null}
      </div>
    );
  }

  timeoutvar: any;

  render() {
		console.log("dict render");
    const search = (string: string) => {
      clearTimeout(this.timeoutvar);
      this.timeoutvar = setTimeout(() => this.props.searchingWord(string, this.state.lang), 1000);
    };
    const searchBarChange = (e: any) => {
      if (e.target.value) search(e.target.value);
      this.setState({
        ...this.state,
        word: e.target.value,
        status: DictStatus.Searched
      });
    };
    const handleLangChange = (e: any, { value }: any) => {
      this.setState({
        ...this.state,
        lang: value
      });
    };

    const handleSelectCard = (card: Card) => () => {};

    const res = this.props.newCards;

    const generateButton = <Button basic color="red" disabled={!this.props.searched} content="generate" />;
    const langoptions = [
      { key: 1, text: "English", value: "en" },
      { key: 2, text: "Hindi", value: "hi" },
      { key: 3, text: "Spanish", value: "es" },
      { key: 4, text: "French", value: "fr" },
      { key: 5, text: "Russian", value: "ru" },
      { key: 6, text: "Simplified Chinese", value: "zh-CN" },
      { key: 7, text: "German", value: "de" },
      { key: 8, text: "Italian", value: "it" },
      { key: 9, text: "Korean", value: "ko" },
      { key: 10, text: "Brazilian Portugese", value: "pt-BR" },
      { key: 11, text: "Arabic", value: "ar" },
      { key: 12, text: "Turkic", value: "tr" }
    ];
    return (
      <div className="dictionary">
        <Input
          className="inputbar"
          placeholder="Search..."
          value={this.state.word}
          onChange={searchBarChange}
        />
        <Dropdown
          onChange={handleLangChange}
          options={langoptions}
          placeholder="Choose language"
          selection
          value={this.state.lang}
        />
        <Modal trigger={generateButton}>
          <Modal.Header>Autogenerate Cards</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              {res.length > 0
                ? res.map((card: Card, i: number) => (
                    <WordCard handleCardClick={handleSelectCard(card)} card={card} key={i} />
                  ))
                : null}
            </Modal.Description>
          </Modal.Content>
        </Modal>
        {this.state.status === DictStatus.Searched ? this.dispMeaning() : null}
      </div>
    );
  }
}

export default Dictionary;
