import * as React from "react";
import { CardDeck, Card } from "../../extension/cards";
import PropsPanel, { PropsPanelProps } from "./PropsPanel";
import { Sidebar, Menu, Segment, Header } from "semantic-ui-react";
import FillForm, { FillFormProps } from "../commons/FillForm";

type PushablePanelsState = {
  color: string;
  visible: boolean;
  activeDeck: CardDeck;
};

/** Decks Panel */

interface DecksPanelProps extends PushablePanelsState {
  decks: CardDeck[];
  handleChangeDeck: (deck: CardDeck) => void;
  createDecksPanelShowHandler: (show?: boolean) => () => void;
}

const DecksPanel: React.SFC<DecksPanelProps> = props => {
  const { visible, createDecksPanelShowHandler } = props;
  const createDeckTabs = (deck: CardDeck, i: number) => {
    const selected = deck === props.activeDeck;
    const onClickHandler = () => props.handleChangeDeck(deck);
    return (
      <div
        className={selected ? "decktab selected" : "decktab normal"}
        style={{ backgroundColor: selected ? props.color : props.color }}
        key={i}
      >
        <Menu.Item onClick={onClickHandler}>{deck.info.name}</Menu.Item>
      </div>
    );
  };
  return (
    <Sidebar
      className="deckspanel"
      animation="push"
      icon="labeled"
      direction="left"
      onHide={createDecksPanelShowHandler(false)}
      visible={visible}
      width="thin"
      style={{ marginRight: "10px" }}
    >
      <Segment>
        <Header as="h3">Decks</Header>
      </Segment>
      <Menu className="decksMenu" vertical fluid>
        {props.decks.map(createDeckTabs)}
      </Menu>
    </Sidebar>
  );
};

/** AddCard Panel */

interface AddCardPanelProps extends PushablePanelsState {
  handleAddCard: (card: Card) => void;
  createAddCardPanelShowHandler: (hide: boolean) => () => void;
}

const AddCardPanel: React.FC<AddCardPanelProps> = props => {
  const { visible, createAddCardPanelShowHandler } = props;
  const fillformprops: FillFormProps = {
    type: "Addcard",
    currentDeck: props.activeDeck,
    submitCardToDeck: props.handleAddCard
  };
  return (
    <Sidebar
      animation="overlay"
      icon="labeled"
      direction="right"
      onHide={createAddCardPanelShowHandler(false)}
      visible={visible}
      width="wide"
    >
      <FillForm {...fillformprops} />
    </Sidebar>
  );
};

/** Wordlist Pushable Panels!!! */

export type WordListPushablePanelsProps = {
  color: string;
  activeDeck: CardDeck;
	activeCard: Card;
	handleToTest: () => void;
  decksPanel: {
    decks: CardDeck[];
    visible: boolean;
    selectDeck: (deck: CardDeck) => void;
  };
  addCardPanel: {
    visible: boolean;
    addCardToDeck: (card: Card) => void;
  };
};

type WordListPushablePanelsState = {
  selectedCard?: Card;
  decksPanel: DecksPanelProps;
  addCardPanel: AddCardPanelProps;
  selectedDeck: CardDeck;
};

class WordListPushablePanels extends React.Component<
  WordListPushablePanelsProps,
  WordListPushablePanelsState
> {
  public constructor(props: WordListPushablePanelsProps) {
    super(props);
    const pushableState: PushablePanelsState = {
      color: this.props.color,
      visible: false,
      activeDeck: this.props.activeDeck
    };
    this.state = {
      decksPanel: {
        ...pushableState,
        visible: this.props.decksPanel.visible,
        activeDeck: this.props.activeDeck,
        decks: this.props.decksPanel.decks,
        handleChangeDeck: this.props.decksPanel.selectDeck,
        createDecksPanelShowHandler: (
          show: boolean = !this.state.decksPanel.visible
        ) => () =>
          this.setState({
            ...this.state,
            decksPanel: {
              ...this.state.decksPanel,
              visible: show
            }
          })
      },
      addCardPanel: {
        ...pushableState,
        handleAddCard: this.props.addCardPanel.addCardToDeck,
        createAddCardPanelShowHandler: (
          show: boolean = !this.state.addCardPanel.visible
        ) => () =>
          this.setState({
            ...this.state,
            addCardPanel: {
              ...this.state.addCardPanel,
              visible: show
            }
          })
      },
      selectedDeck: this.props.activeDeck,
      selectedCard: undefined
    };
  }
  render() {
    let currentPropsPanelProps: PropsPanelProps = {
      color: "green",
      deck: this.props.activeDeck,
      card: this.state.selectedCard,
      handleShowAddCardPanel: this.state.addCardPanel.createAddCardPanelShowHandler(
        true
			),
			handleTest: this.props.handleToTest
    };
    return (
      <Sidebar.Pushable
        className="Panels"
        as={Segment.Group}
        position="fixed"
        style={{
          width: window.screen.width + "px",
					height: (window.screen.height * 81) / 100 + "px",
					overflow: 'hidden'
        }}
      >
        <DecksPanel {...this.state.decksPanel} />
        <AddCardPanel {...this.state.addCardPanel} />

        <Sidebar.Pusher dimmed={this.state.addCardPanel.visible}>
          <PropsPanel {...currentPropsPanelProps} />
          <div
            style={{
              display: "table",
              width: window.screen.width + "px",
              height: (window.screen.height * 80) / 100 + "px"
            }}
          >
            <div
              className="decksPanelCaller"
              onClick={this.state.decksPanel.createDecksPanelShowHandler()}
              style={{
                height: (window.screen.height * 80) / 100 + "px",
                width: "1%",
                float: "left",
                backgroundColor: this.state.decksPanel.visible
                  ? "white"
									: "green",
								overflow: 'hidden'
              }}
            />
            <div
              className="CardList content"
              style={{
                height: (window.screen.height * 80) / 100 + "px",
                width: "90%",
								float: "left",
								overflow: 'hidden'
              }}
            >
              {this.props.children}
            </div>
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default WordListPushablePanels;
