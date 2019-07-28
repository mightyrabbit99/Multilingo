import * as React from "react";
import { Grid, Segment, Header, Button, Icon } from "semantic-ui-react";
import { Card as GlossaryCard } from "../../extension/cards";

export type WordCardProps = {
  card: GlossaryCard;
  handleCardClick: () => void;
  handleDeleteCard: () => void;
};

class WordCard extends React.Component<WordCardProps, {}> {
  public render() {
    return (
      <div className="WordCard-content">
        <div>
          <Button
            onClick={this.props.handleDeleteCard}
            style={{ marginTop: "0.5em" }}
          >
            <Icon name="close" />
            delete card
          </Button>
        </div>
        <Segment
          className="wordcard"
          onClick={this.props.handleCardClick}
          style={{ marginTop: "0.2em" }}
        >
          <Grid divided="vertically" padded stackable>
            <Grid.Row>
              <Grid.Column width={4}>
                <Header className="subject">Front:</Header>
              </Grid.Column>
              <Grid.Column width={8}>
                <div className="content">{this.props.card.front}</div>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={4}>
                <Header className="subject">Back:</Header>
              </Grid.Column>
              <Grid.Column width={8}>
                <div className="content">{this.props.card.back}</div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}

export default WordCard;
