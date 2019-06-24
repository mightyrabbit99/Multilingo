import * as React from "react";
import { RouteComponentProps } from "react-router";

import { CardDeck, Card } from "../../extension/cards";
import WordCard, { WordCardProps } from "./WordCard";
import WordListPushablePanels, { WordListPushablePanelsProps } from "./WordListPushablePanels";

export interface CardListProps
  extends CardListDispatchProps,
    CardListStateProps,
    RouteComponentProps<{}> {}

export interface CardListStateProps {
  title: string;
  decks: CardDeck[];
	selectedDeck: CardDeck;
	selectedCard: Card;
}

export interface CardListDispatchProps {
  logout: () => void;
}

type CardListState = {
	addDeckPanelVisible: boolean;
	decksPanelVisible: boolean;
  currentDeck: CardDeck;
  selectedCard?: Card;
};

class CardList extends React.Component<CardListProps, CardListState> {
  public constructor(props: CardListProps) {
    super(props);
    this.state = {
			addDeckPanelVisible: false,
			decksPanelVisible: true,
      currentDeck: this.props.selectedDeck,
      selectedCard: this.props.selectedCard
    };
  }

  public componentDidMount() {}

  public render() {
    let currentPushablePanelProps: WordListPushablePanelsProps = {
      color: "green",
			decks: this.props.decks,
			activeDeck: this.state.currentDeck,
			activeCard: this.state.selectedCard,
      selectDeck: (deck: CardDeck) => {}
    };
    return (
      <div className="CardList" style={{height: window.screen.height * 80 / 100 + 'px'}}>
        <WordListPushablePanels {...currentPushablePanelProps}>
					{this.rootElement}
        </WordListPushablePanels>
      </div>
    );
  }

  private generateCard = (card: Card) => {
    let props: WordCardProps = {
      card: card,
      handleCardClick: () => {
        this.setState({ selectedCard: card });
      }
    };
    return <WordCard {...props} />;
  };

  private rootElement = (
    <div className="cards" style={{position: 'fixed', top: 0, right: 0, bottom: 0, left: 0}} >
      {this.props.selectedDeck.cards.map(this.generateCard)}
    </div>
  );
}

export default CardList;
