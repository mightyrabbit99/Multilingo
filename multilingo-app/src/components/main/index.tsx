import * as React from "react";
import { RouteComponentProps } from "react-router";
import * as qs from "query-string";
import { CardDeck, defaultDeck } from "../../extension/cards";
import Deck, { DeckProps } from "./Deck";
import Dictionary, { DictionaryProps } from "./Dictionary";
import ControlBar, { MainControlBarProps } from "../commons/ControlBar";
import Dict, { SearchResult, wordNotFound } from "../../extension/dict";

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
  updateDatabaseDecks: (deck: CardDeck[]) => void;
  handleDeleteDeck: (deck: CardDeck) => void;
}

export enum MainPage {
  Main = "Main",
  Dict = "Dict"
}

type MainState = {
  page: MainPage;
  selectedDeck: CardDeck;
  dictProps: DictionaryProps;
};

class Main extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
    const query = qs.parse(this.props.location.search);
    if (query.define) {
      this.state = {
        page: MainPage.Dict,
        selectedDeck: defaultDeck,
        dictProps: {
          word: query.define as string,
          searched: this.props.searched,
          searchResult: this.props.wordMeaning,
          searchingWord: (word: string) =>
            this.props.searchingWord(word, this.props.dict)
        }
      };
      this.props.searchingWord(query.define as string, this.props.dict);
    } else {
      this.state = {
        page: MainPage.Main,
        selectedDeck: defaultDeck,
        dictProps: {
          word: "",
          searched: this.props.searched,
          searchResult: this.props.wordMeaning,
          searchingWord: (word: string) =>
            this.props.searchingWord(word, this.props.dict)
        }
      };
    }
  }

  componentWillMount() {
    this.props.receiveDecks(this.props.decks);
  }

  componentWillReceiveProps(nextProps: any) {
    console.log(nextProps);
    this.setState({
      ...this.state,
      dictProps: {
        ...this.state.dictProps,
        searched: nextProps.searched,
        searchResult: nextProps.wordMeaning
      }
    });
  }

  componentDidUpdate() {
    this.props.updateDatabaseDecks(this.props.decks);
  }

  public render() {
    console.log("main render");
    const generateDeck = (deck: CardDeck, i: number) => {
      let props: DeckProps = {
        deck: deck,
        handleDeckClick: () => this.props.handleSelectDeck(deck),
        handleDeleteDeck: () => this.props.handleDeleteDeck(deck)
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
        return <Dictionary {...this.state.dictProps} />;
      }
    }
  }
}

export default Main;
