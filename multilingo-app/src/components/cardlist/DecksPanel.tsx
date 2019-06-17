import * as React from "react";
import { CardDeck } from "../../extension/cards";
import { Sidebar, Menu, Segment, Header, Ref } from "semantic-ui-react";

export type DecksPanelProps = {
  color: string;
  activeDeck: CardDeck;
  decks: CardDeck[];
  selectDeck: (deck: CardDeck) => void;
};

type DecksPanelState = {
  visible: boolean;
  segmentRef: any;
  selectedDeck: CardDeck;
}

class DecksPanel extends React.Component<DecksPanelProps, DecksPanelState> {
  public constructor(props: DecksPanelProps) {
    super(props);
    this.state = {
      visible: true,
      segmentRef: React.createRef(),
      selectedDeck: props.activeDeck
    };
  }

  private createDeckTabs = (deck: CardDeck) => {
    const selected = deck === this.state.selectedDeck;
    const onClickHandler = () => {
      this.setState({selectedDeck: deck});
    }
    return (
      <div 
        className={selected ? 'decktab selected': 'decktab normal'}
        style={{backgroundColor: selected ? this.props.color: this.props.color}}
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

  render() { 
    const { visible, segmentRef } = this.state;
    const handleSidebarHide = () => this.setState({ visible: false });
    const handleClick = () => {
      this.setState({ visible: true });
    };
    return (
      <div className="decksPanel">
        <Sidebar.Pushable as={Segment.Group} style={{width:"100vw", height:"100vh"}}>
          <Sidebar
            animation='overlay'
            icon='labeled'
            inverted
            onHide={handleSidebarHide}
            vertical
            target={segmentRef}
            visible={visible}
            width='thin'
          >
            <Segment>
              <Header as='h3'>Decks</Header>
            </Segment>
            {this.props.decks.map(this.createDeckTabs)}
          </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
            <Ref innerRef={segmentRef}>
              {this.props.children}
            </Ref>
          </Sidebar.Pusher>

        </Sidebar.Pushable>
      </div>
    );
  }
}

export default DecksPanel;
