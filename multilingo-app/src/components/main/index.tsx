import * as React from "react";
import { RouteComponentProps } from "react-router";

import { CardDeck } from "../../extension/cards";
import Deck, { DeckProps } from "./Deck";
import ControlBar, { MainControlBarProps } from "../commons/ControlBar";

export interface MainProps
  extends MainDispatchProps,
    MainStateProps,
    RouteComponentProps<{}> {}

export interface MainStateProps {
  title: string;
  decks: CardDeck[];
  newDeck: CardDeck | null;
}

export interface MainDispatchProps {
  logout: () => void;
  handleSelectDeck: (deck: CardDeck) => void;
  handleAddDeck: (deck: CardDeck) => void;
  receiveDecks: (decks: CardDeck[]) => void;
}

type MainState = {
	selectedDeck: CardDeck;
};

class Main extends React.Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
    (window as any).decks = props.decks;
  }

  componentDidMount() {
    //this.props.receiveDecks([]);
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
        color: "green",
        handleAddDeck: this.props.handleAddDeck
      };
      return <ControlBar {...props} />;
    };

    return (
      <div className="Main" style={{ display: "inline" }}>
        <div
          className="Application_main"
          style={{
            flexDirection: "row",
            flexWrap: "wrap"
          }}
        >
          {this.props.decks.map(generateDeck)}
        </div>
        {controlBar()}
      </div>
    );
  }
}

export default Main;
