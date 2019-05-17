import * as React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

export type DeckProps = {
    title: string;
    dateAdded: Date;
    description: string;
    noOfWords: number;
    lastRevised: Date;
    lastResult: number;
    id: number;
    link: string;
}

class Deck extends React.Component<DeckProps, {}> {
    public render() {
        return (
            <div className={"deck" + this.props.id}>
                <Card href={this.props.link}>
                    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{this.props.title}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Last revised in: {this.props.lastRevised.getTime()}</span>
                        </Card.Meta>
                        <Card.Description>{this.props.description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='user' />
                            High Score: {this.props.lastResult}
                        </a>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}

export default Deck;