import * as React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { CardDeck } from "../../extension/cards";

export type DeckProps = {
  deck: CardDeck;
  handleDeckClick: () => void;
};

class Deck extends React.Component<DeckProps, {}> {
  public render() {
    const carddeck = this.props.deck.info;
    return (
      <Card
        className={"deck" + carddeck.name}
        onClick={this.props.handleDeckClick}
        style={{ margin: "1em auto 2em auto" }}
      >
        <Image
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{carddeck.name}</Card.Header>
          <Card.Meta>
            <span className="date">
              Last revised in: {carddeck.lastRevised}
            </span>
          </Card.Meta>
          <Card.Description>{carddeck.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="user" />
          High Score: {carddeck.lastResult}
        </Card.Content>
      </Card>
    );
  }
}

export default Deck;
