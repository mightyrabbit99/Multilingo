import * as React from "react";
import { RouteComponentProps } from "react-router";

import { CardDeck, Card } from "../../extension/cards";
import WordCard, { WordCardProps } from "../commons/WordCard";
import WordListPushablePanels, {
  WordListPushablePanelsProps
} from "./WordListPushablePanels";

export interface CardListProps
  extends CardListDispatchProps,
    CardListStateProps,
    RouteComponentProps<{}> {}

export interface CardListStateProps {
  title: string;
  decks: CardDeck[];
  selectedDeck: CardDeck;
  selectedCard: Card;
  newCards: Card[];
}

export interface CardListDispatchProps {
  addCardsToDeck: (card: Card[]) => void;
  selectDeck: (deck: CardDeck) => void;
  handleToTest: () => void;
  updateDatabaseDecks: (deck: CardDeck[]) => void;
  deleteCardFromDeck: (card: Card, deck: CardDeck) => void;
}

type CardListState = {
  addCardPanelVisible: boolean;
  decksPanelVisible: boolean;
  currentDeck: CardDeck;
  selectedCard: Card;
};

class CardList extends React.Component<CardListProps, CardListState> {
  public constructor(props: CardListProps) {
    super(props);
    this.state = {
      addCardPanelVisible: false,
      decksPanelVisible: true,
      currentDeck: this.props.selectedDeck,
      selectedCard: this.props.selectedCard
    };
  }

  public render() {
    console.log("cardlist render");
    const generateCard = (card: Card, i: number) => {
      let props: WordCardProps = {
        card: card,
        handleCardClick: () => {
          this.setState({ selectedCard: card });
        },
        handleDeleteCard: () => {
          this.props.deleteCardFromDeck(card, this.props.selectedDeck);
          this.props.updateDatabaseDecks(this.props.decks);
          this.setState(state => state);
        }
      };
      return <WordCard {...props} key={i} />;
    };
    let currentPushablePanelProps: WordListPushablePanelsProps = {
      color: "green",
      activeDeck: this.state.currentDeck,
      activeCard: this.state.selectedCard,
      handleToTest: this.props.handleToTest,
      decksPanel: {
        decks: this.props.decks,
        visible: this.state.decksPanelVisible,
        selectDeck: this.props.selectDeck
      },
      addCardPanel: {
        visible: this.state.addCardPanelVisible,
        addCardToDeck: (card: Card) => {
          this.props.addCardsToDeck([card]);
          this.props.updateDatabaseDecks(this.props.decks);
          this.setState(state => state);
        }
      }
    };
    return (
      <WordListPushablePanels {...currentPushablePanelProps}>
        {this.props.selectedDeck.cards.map(generateCard)}
      </WordListPushablePanels>
    );
  }
}

export default CardList;
