import * as React from "react";
import { RouteComponentProps } from "react-router";

import { CardDeck, defaultDeck } from "../../extension/cards";
import Deck, { DeckProps } from "./Deck";
import Dictionary, { DictionaryProps } from "./Dictionary";
import ControlBar, { MainControlBarProps } from "../commons/ControlBar";
import Dict, { SearchResult, wordNotFound } from "../../extension/dict";

export interface MainProps extends MainDispatchProps, MainStateProps, RouteComponentProps<{}> {}

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
    this.state = {
      page: MainPage.Main,
			selectedDeck: defaultDeck,
			dictProps: {
				searched: this.props.searched,
				searchResult: this.props.wordMeaning,
				searchingWord: (word: string) => this.props.searchingWord(word, this.props.dict)
			}
    };
  }

  componentDidMount() {
    //this.props.receiveDecks([]);
	}
	
	componentWillReceiveProps(nextProps: any) {
		console.log(nextProps);
		this.setState({...this.state, dictProps: {...this.state.dictProps, searched: nextProps.searched, searchResult: nextProps.wordMeaning}});
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
				handleToDict: () => this.setState({...this.state, page: MainPage.Dict}),
				handleToDeck: () => this.setState({...this.state, page: MainPage.Main}),
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
				return <Dictionary {...this.state.dictProps}/>;
			}
    }
  }
}

export default Main;
