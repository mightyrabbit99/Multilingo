import * as React from "react";
import { RouteComponentProps } from "react-router";

import {
  CardDeck,
  defaultDeck,
  Card,
  CardCollection,
  cardDeckToJSON,
  CardType
} from "../../extension/cards";
import Deck, { DeckProps } from "./Deck";
import Dictionary, { DictionaryProps } from "./Dictionary";
import ControlBar, { MainControlBarProps } from "../commons/ControlBar";
import Dict, { SearchResult } from "../../extension/dict";

export interface MainProps
  extends MainDispatchProps,
    MainStateProps,
    RouteComponentProps<{}> {}

export interface MainStateProps {
  title: string;
  decks: CardDeck[];
  newDeck: CardDeck | null;
  searched: boolean;
  wordMeaning: SearchResult;
  dict: Dict;
}

export interface MainDispatchProps {
  logout: () => void;
  handleSelectDeck: (deck: CardDeck) => void;
  handleAddDeck: (deck: CardDeck) => void;
  receiveDecks: (decks: CardDeck[]) => void;
  searchingWord: (word: string, dict: Dict) => void;
  updateDatabaseDecks: (
    decks: {
      cards: {
        category: string;
        front: string;
        back: string;
        type: CardType;
        originalCard: null;
        dateAdded: number;
        comments: never[];
        description: string;
        info: {
          lastRevised: number;
          lastResult: number;
          correct: number;
          wrong: number;
          asked: number;
        };
      }[];
      info: {
        [key: string]: any;
        name: string;
        category: string;
        dateAdded: number;
      };
    }[]
  ) => void;
}

export enum MainPage {
  Main = "Main",
  Dict = "Dict"
}

type MainState = {
  page: MainPage;
  selectedDeck: CardDeck;
};

class Main extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
    this.state = {
      page: MainPage.Main,
      selectedDeck: defaultDeck
    };
  }

  componentDidMount() {
    this.props.receiveDecks(this.props.decks);
  }

  componentDidUpdate() {
    let index = 0;
    let toStore: {
      cards: {
        category: string;
        front: string;
        back: string;
        type: CardType;
        originalCard: null;
        dateAdded: number;
        comments: never[];
        description: string;
        info: {
          lastRevised: number;
          lastResult: number;
          correct: number;
          wrong: number;
          asked: number;
        };
      }[];
      info: {
        [key: string]: any;
        name: string;
        category: string;
        dateAdded: number;
      };
    }[] = [];
    for (index = 0; index < this.props.decks.length; index++) {
      toStore[index] = cardDeckToJSON(this.props.decks[index]);
    }
    this.props.updateDatabaseDecks(toStore);
  }

  public render() {
    console.log("main render");
    const generateDeck = (deck: CardDeck, i: number) => {
      let props: DeckProps = {
        deck: deck,
        handleDeckClick: () => this.props.handleSelectDeck(deck)
      };
      return <Deck key={i} {...props} />;
    };

    const controlBar = () => {
      let props: MainControlBarProps = {
        location: "Main",
        page: this.state.page,
        color: "green",
        handleAddDeck: this.props.handleAddDeck,
        handleToDict: () =>
          this.setState({ ...this.state, page: MainPage.Dict }),
        handleToDeck: () =>
          this.setState({ ...this.state, page: MainPage.Main }),
        modalOpen: false
      };
      return <ControlBar {...props} />;
    };

    switch (this.state.page) {
      case MainPage.Main:
        return (
          <div className="Main" style={{ display: "inline" }}>
            <div
              className="Application_main"
              style={{
                flexDirection: "row",
                flexWrap: "wrap"
              }}
            >
              {this.props.decks.length === 0 ? (
                <img
                  src="https://i.imgur.com/kvZ0fst.png"
                  style={{
                    margin: "auto"
                  }}
                />
              ) : null}

              {this.props.decks.map(generateDeck)}
            </div>
            {controlBar()}
          </div>
        );
      case MainPage.Dict: {
        const dictProps: DictionaryProps = {
          searching: !this.props.searched,
          searchResult: this.props.wordMeaning,
          searchingWord: (word: string) =>
            this.props.searchingWord(word, this.props.dict)
        };
        return <Dictionary {...dictProps} />;
      }
    }
  }
}

export default Main;
