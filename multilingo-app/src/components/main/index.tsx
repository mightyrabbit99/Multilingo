import * as React from 'react';
import { RouteComponentProps} from 'react-router';

import { CardDeck } from '../../extension/cards';
import Deck, { DeckProps } from './Deck';

export interface MainProps extends MainDispatchProps, MainStateProps, RouteComponentProps<{}> {}

export interface MainStateProps {
  title: string;
  decks: CardDeck[];
}

export interface MainDispatchProps {
  logout: () => void;
}

type MainState = {
    selectedDeck: CardDeck;
}

class Main extends React.Component<MainProps, MainState> {

  public componentDidMount() {

  }

  public render() {
    return (
      <div className="Main">
        <div className="Application_main">
          {this.props.decks.map(generateDeck)}
        </div>
      </div>
    );
  }

}

const generateDeck = (deck: CardDeck) => {
  let props: DeckProps = {
    deck: deck,
    handleDeckClick: () => {}
  };
  return <div className="deck"><Deck {...props}/></div>;
};



export default Main;
