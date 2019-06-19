import * as React from "react";
import { CardDeck } from "../../extension/cards";
import { Card } from "../../extension/types";
import PropsPanel, { PropsPanelProps } from "./PropsPanel";
import { Sidebar, Menu, Segment, Header, Ref, Container } from "semantic-ui-react";

export type WordListPushablePanelsProps = {
  color: string;
  activeDeck: CardDeck;
  decks: CardDeck[];
  selectDeck: (deck: CardDeck) => void;
};

type PushablePanelsState = {
	color: string;
  visible: boolean;
	segmentRef: any;
}

interface DecksPanelProps extends PushablePanelsState {
	decks: CardDeck[];
	activeDeck: CardDeck;
	handleChangeDeck: (deck: CardDeck) => void;
	createDecksPanelShowHandler: (hide: boolean) => () => void;
};

interface AddCardPanelProps extends PushablePanelsState {
	handleAddCard: (card: Card) => void;
	createAddCardPanelShowHandler: (hide: boolean) => () => void;
};

export type WordListPushablePanelsState = {
	selectedCard?: Card;
	decksPanel: DecksPanelProps;
	addCardPanel: AddCardPanelProps;
	selectedDeck: CardDeck;
}

const DecksPanel: React.SFC<DecksPanelProps> = props => {
	const { visible, segmentRef, createDecksPanelShowHandler } = props;
	const createDeckTabs = (deck: CardDeck) => {
    const selected = deck === props.activeDeck;
    const onClickHandler = () => props.handleChangeDeck(deck);
    return (
      <div 
        className={selected ? 'decktab selected': 'decktab normal'}
        style={{backgroundColor: selected ? props.color: props.color}}
      >
        <Menu.Item 
          as='a'
          onClick={onClickHandler}
        >
            {deck.info.name}
        </Menu.Item>
      </div>
    );
  }
  return (
		<Sidebar
			className='deckspanel'
			animation='push'
			icon='labeled'
			direction='left'
			inverted
			onHide={createDecksPanelShowHandler(false)}
			vertical
			visible={visible}
			width='thin'
			style={{marginRight:'10px'}}
		>
			<Segment>
				<Header as='h3'>Decks</Header>
			</Segment>
			{props.decks.map(createDeckTabs)}
		</Sidebar>
  );
};

const AddCardPanel: React.SFC<AddCardPanelProps> = props => {
	const { visible, segmentRef, createAddCardPanelShowHandler } = props;
  return (
		<Sidebar
			animation='overlay'
			icon='labeled'
			direction='right'
			inverted
			onHide={createAddCardPanelShowHandler(false)}
			vertical
			target={segmentRef}
			visible={visible}
			width='thin'
		>
			<Segment>
				<Header as='h3'>Decks</Header>
			</Segment>
		</Sidebar>
  );
};

class WordListPushablePanels extends React.Component<WordListPushablePanelsProps, WordListPushablePanelsState> {
  public constructor(props: WordListPushablePanelsProps) {
    super(props);
    const pushableState: PushablePanelsState = {
			color: this.props.color,
      visible: false,
      segmentRef: React.createRef()
		};
		this.state = {
			decksPanel: {
				...pushableState,
				visible: true,
				activeDeck: this.props.activeDeck,
				decks: this.props.decks,
				handleChangeDeck: (deck: CardDeck) => this.setState({...this.state, selectedDeck: deck}),
				createDecksPanelShowHandler: (show: boolean) => () => this.setState(
					{...this.state, 
						decksPanel: {
							...this.state.decksPanel,
							visible: show
						}}
				)
			},
			addCardPanel: {
				...pushableState,
				handleAddCard: (card: Card) => this.props.activeDeck.addCard(card),
				createAddCardPanelShowHandler: (show: boolean) => () => this.setState(
					{...this.state, 
						addCardPanel: {
							...this.state.addCardPanel,
							visible: show
						}}
				)
			},
			selectedDeck: this.props.activeDeck,
			selectedCard: undefined
		}
	}

	public createAddCardPanelShowHandler = (show: boolean) => () => this.setState(
		{...this.state, 
			addCardPanel: {
				...this.state.addCardPanel,
				visible: show
			}})

  render() { 
		let currentPropsPanelProps: PropsPanelProps = {
      color: "green",
      deck: this.props.activeDeck,
			card: this.state.selectedCard,
			handleShowAddCardPanel: this.createAddCardPanelShowHandler(true)
    };
    return (
				<Sidebar.Pushable 
					className="Panels" 
					as={Segment.Group} 
					position='fixed'
					style={{width:window.screen.width + 'px', height:window.screen.height * 80 / 100 + 'px'}}
				>
          <DecksPanel {...this.state.decksPanel}/>
					<AddCardPanel {...this.state.addCardPanel}/>

          <Sidebar.Pusher dimmed={this.state.addCardPanel.visible }>
						<PropsPanel {...currentPropsPanelProps}/>
            {this.props.children}
          </Sidebar.Pusher>

        </Sidebar.Pushable>
    );
  }
}

export default WordListPushablePanels;
