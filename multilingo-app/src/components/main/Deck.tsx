import * as React from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import { CardDeck } from "../../extension/cards";

export type DeckProps = {
  deck: CardDeck;
  handleDeckClick: () => void;
  handleDeleteDeck: () => void;
};

class Deck extends React.Component<DeckProps, {}> {
  public render() {
    const carddeck = this.props.deck.info;
    return (
      <div className={"carddeck"}>
        <Button
          onClick={this.props.handleDeleteDeck}
          style={{ marginLeft: "8%", marginTop: "0.5em" }}
        >
          <Icon name="close" />
          delete this deck
        </Button>
        <Card
          className={"carddeck"}
          onClick={this.props.handleDeckClick}
          style={{ margin: "1em 3em 35em 3em" }}
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
      </div>
    );
  }
}

export default Deck;
