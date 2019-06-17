import * as React from "react";
import { RouteComponentProps } from "react-router";

import { CardDeck } from "../../extension/cards";
import { Card } from "../../extension/types";
import WordCard, { WordCardProps } from "./WordCard";
import PropsPanel, { PropsPanelProps } from "./PropsPanel";
import DecksPanel, { DecksPanelProps } from "./DecksPanel";

export interface CardListProps
  extends CardListDispatchProps,
    CardListStateProps,
    RouteComponentProps<{}> {}

export interface CardListStateProps {
  title: string;
  decks: CardDeck[];
  selectedDeck: CardDeck;
}

export interface CardListDispatchProps {
  logout: () => void;
}

type CardListState = {
  currentDeck: CardDeck;
  selectedCard: Card | undefined;
};

class CardList extends React.Component<CardListProps, CardListState> {
  public constructor(props: CardListProps) {
    super(props);
    this.state = {
      currentDeck: this.props.selectedDeck,
      selectedCard: undefined
    };
  }

  public componentDidMount() {}

  public render() {
    let currentPropsPanelProps: PropsPanelProps = {
      color: "green",
      deck: this.state.currentDeck,
      card: this.state.selectedCard
    };

    let currentDecksPanelProps: DecksPanelProps = {
      color: "green",
      activeDeck: this.state.currentDeck,
      decks: this.props.decks,
      selectDeck: () => {}
    };
    return (
      <div className="CardList">
        <DecksPanel {...currentDecksPanelProps}>
          <div className="workspace">
            <PropsPanel {...currentPropsPanelProps}>
              {this.rootElement}
            </PropsPanel>
          </div>
        </DecksPanel>
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
