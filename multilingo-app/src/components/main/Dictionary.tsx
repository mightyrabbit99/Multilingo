import * as React from "react";
import { SearchResult, wordNotFound } from "../../extension/dict";

import {
  Input,
  Dropdown,
  Button,
  Modal,
  Icon,
  Grid,
  Segment
} from "semantic-ui-react";
import WordCard from "../commons/WordCard";
import { Card, CardDeck } from "../../extension/cards";

export interface DictionaryProps {
  decks: CardDeck[];
  word: string;
  searched: boolean;
  searchResult: SearchResult;
  newCards: Card[];
  searchingWord: (word: string, lang: string) => void;
  selectDeck: (deck: CardDeck) => void;
  addCardToDeck: (cards: Card[]) => void;
}

enum DictStatus {
  Main = "Main",
  Searched = "Searched"
}

type DictionaryState = {
  currentDeck: CardDeck | null;
  status: DictStatus;
  word: string;
  meaning: SearchResult;
  lang: string;
  cardsModalOpen: boolean;
};

class Dictionary extends React.Component<DictionaryProps, DictionaryState> {
  constructor(props: DictionaryProps) {
    super(props);
    this.state = {
      currentDeck: null,
      status: props.word ? DictStatus.Searched : DictStatus.Main,
      word: props.word,
      meaning: wordNotFound,
      lang: "en",
      cardsModalOpen: false
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
                  {a.example ? (
                    <p className="example-sentence">{a.example}</p>
                  ) : null}
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
      this.timeoutvar = setTimeout(
        () => this.props.searchingWord(string, this.state.lang),
        1000
      );
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

    const handleDeckChange = (e: any, { value }: any) => {
      this.setState({
        ...this.state,
        currentDeck: this.props.decks[value]
      });
    };

    const handleAddCardsClick = () => {
      if (this.state.currentDeck) this.props.selectDeck(this.state.currentDeck);
      this.props.addCardToDeck(this.props.newCards);
    };

    const handleSelectCard = (card: Card) => () => {};
    const deleteCardFromDeck = (card: Card) => () => {};

    const cardsModalOpenHandler = (open: boolean) => () =>
      this.setState({ ...this.state, cardsModalOpen: open });

    const res = this.props.newCards;

    const generateButton = (
      <Button
        basic
        color="red"
        disabled={!this.props.searched}
        content="Generate Cards!"
        onClick={cardsModalOpenHandler(true)}
      />
    );
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
    const deckoptions = this.props.decks.map((d: CardDeck, i: number) => ({
      key: i,
      text: d.info.name,
      value: i
    }));
    return (
      <div>
        <div className="dictionary" style={{ margin: "10vh 0vw 0vh 25vw" }}>
          <Grid columns={4}>
            <Grid.Row style={{ paddingBottom: "0.1em" }}>
              <Grid.Column width={1} />
              <Grid.Column width={3}>Phrases</Grid.Column>
              <Grid.Column width={3}>Language</Grid.Column>
              <Grid.Column width={3} />
            </Grid.Row>
            <Grid.Row style={{ paddingTop: "0.1em" }}>
              <Grid.Column width={1}>
                <Icon name="search" size="big" />
              </Grid.Column>
              <Grid.Column width={3}>
                <Input
                  className="inputbar"
                  placeholder="Search..."
                  value={this.state.word}
                  onChange={searchBarChange}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Dropdown
                  onChange={handleLangChange}
                  options={langoptions}
                  placeholder="Choose language"
                  selection
                  value={this.state.lang}
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Modal
                  trigger={generateButton}
                  open={this.state.cardsModalOpen}
                  onClose={cardsModalOpenHandler(false)}
                >
                  <Modal.Header>Autogenerate Cards</Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      {res.length > 0
                        ? res.map((card: Card, i: number) => (
                            <WordCard
                              handleCardClick={handleSelectCard(card)}
                              handleDeleteCard={deleteCardFromDeck(card)}
                              card={card}
                              key={i}
                            />
                          ))
                        : null}
                    </Modal.Description>
                    <div
                      className="generateButtons"
                      style={{ marginTop: "0.5em", marginLeft: "1em" }}
                    >
                      <Dropdown
                        onChange={handleDeckChange}
                        options={deckoptions}
                        placeholder="Select Deck"
                        style={{ marginRight: "1em" }}
                      />
                      <Button
                        onClick={handleAddCardsClick}
                        content="Add to deck"
                        disabled={!this.state.currentDeck && true}
                      />
                    </div>
                  </Modal.Content>
                </Modal>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <Segment
          style={{ margin: "2vh 15vw 2vh 15vw" }}
          placeholder
          textAlign="center"
        >
          {this.state.status === DictStatus.Searched
            ? this.dispMeaning()
            : "Please search for a phrase..."}
        </Segment>
      </div>
    );
  }
}

export default Dictionary;
