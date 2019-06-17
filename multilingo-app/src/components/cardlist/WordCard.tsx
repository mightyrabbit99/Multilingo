import * as React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { Card as GlossaryCard } from '../../extension/types';

export type WordCardProps = {
    card: GlossaryCard;
    handleCardClick: () => void;
}

class WordCard extends React.Component<WordCardProps, {}> {
    public render() {
        return (
            <Segment className="card">
                <Grid divided="vertically" padded>
                    <Grid.Row>
                        <Grid.Column width={2}>
                            <div className="subject">
                                Front:
                            </div>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <div className="content">
                                {this.props.card.front}
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    <Grid.Column width={2}>
                            <div className="subject">
                                Back:
                            </div>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <div className="content">
                                {this.props.card.back}
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

export default WordCard;