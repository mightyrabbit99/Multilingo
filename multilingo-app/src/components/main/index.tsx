import * as React from 'react';
import { RouteComponentProps } from 'react-router';


import { CardDeck } from '../../extension/cards';
import Deck, { DeckProps } from './Deck';

export interface MainProps extends MainDispatchProps, MainStateProps, RouteComponentProps<{}> {}

export interface MainStateProps {
  title: string;
  decks: CardDeck[];
}

export interface MainDispatchProps {
	push: (s: string) => void;
	logout: () => void;
	handleSelectDeck: (deck: CardDeck) => void;
}

type MainState = {
    selectedDeck: CardDeck;
}

class Main extends React.Component<MainProps, MainState> {

  public render() {
    const generateDeck = (deck: CardDeck, i: number) => {
      let props: DeckProps = {
        deck: deck,
        handleDeckClick: () => {
					this.props.handleSelectDeck(deck);
					this.props.push('/cardlist');
				}
      };
      return <Deck key={i} {...props}/>;
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
