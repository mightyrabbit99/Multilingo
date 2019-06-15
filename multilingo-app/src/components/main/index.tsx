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

  public render() {
    const generateDeck = (deck: CardDeck) => {
      let props: DeckProps = {
        deck: deck,
        handleDeckClick: () => {}
      };
      return <Deck {...props}/>;
    };
    
    const rootElement = (deck: CardDeck[]) => (
      <div className="Main">
        <div className="Application_main">
          {deck.map(generateDeck)}
        </div>
      </div>
    );
    
    return (
      rootElement(this.props.decks)
    );
  }

}



export default Main;
