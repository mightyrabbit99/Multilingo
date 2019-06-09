import * as React from 'react';
import { RouteComponentProps} from 'react-router';

import { CardDeck } from '../../extension/cards';
import { Card } from '../../extension/types';
import WordCard, { WordCardProps } from '../commons/WordCard';
const SlidingPane = require('react-sliding-pane');
import 'react-sliding-pane/dist/react-sliding-pane.css';

export interface CardListProps extends CardListDispatchProps, CardListStateProps, RouteComponentProps<{}> {}

export interface CardListStateProps {
  title: string;
  deck: CardDeck;
}

export interface CardListDispatchProps {
  logout: () => void;
}

type CardListState = {
  selectedCard: Card | null;
}

class CardList extends React.Component<CardListProps, CardListState> {
  public constructor(props: CardListProps) {
    super(props);
    this.state = {
      selectedCard: null
    };
  }

  public componentDidMount() {

  }

  public render() {
    return (
      <div className="CardList">
        {this.rootElement}
        <SlidingPane 
            className='some-custom-class'
            overlayClassName='some-custom-overlay-class'
            isOpen={ this.state.selectedCard }
            title='Hey, it is optional pane title.  I can be React component too.'
            form='right'
            width='400px'
            subtitle='Optional subtitle.'
            onRequestClose={ () => {
                // triggered on "<" on left top click or on outside click
                this.setState({ selectedCard: null });
            } }>
            <div></div>
        </SlidingPane>
      </div>
    );
  }

  private generateCard = (card: Card) => {
    let props: WordCardProps = {
      card: card,
      handleCardClick: () => {this.setState({selectedCard: card});}
    };
    return <div className="wordcard"><WordCard {...props}/></div>;
  };

  private rootElement = (
    <div className="cards">
      {this.props.deck.cards.map(this.generateCard)}
    </div>
  );

}



export default CardList;
