import * as React from 'react';
import { Container } from 'semantic-ui-react';
import { CardDeck } from '../../extension/cards';
import { Card } from '../../extension/types';
import ControlBar, { defaultControlBarProps } from '../commons/ControlBar';

export type PropsPanelProps = {
    color: string;
    deck: CardDeck;
    card?: Card;
}

//const PropsPanelLocation = 'Main';

const PropsPanel: React.SFC<PropsPanelProps> = props => {
    return (
        <div className='propspanel'>
            <div className='propspanel description'>
                <Container>
                    <p>This is the description of the decks and cards</p>
                </Container>
            </div>
            <ControlBar {...defaultControlBarProps} />
        </div>
    )
}

export default PropsPanel;