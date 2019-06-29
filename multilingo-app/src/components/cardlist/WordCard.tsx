import * as React from "react";
import { Grid, Segment, Header } from "semantic-ui-react";
import { Card as GlossaryCard } from "../../extension/cards";

export type WordCardProps = {
  card: GlossaryCard;
  handleCardClick: () => void;
};

class WordCard extends React.Component<WordCardProps, {}> {
  public render() {
    return (
      <Segment className="card">
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
    );
  }
}

export default WordCard;
