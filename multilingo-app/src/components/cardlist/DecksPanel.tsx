import * as React from 'react';
import { CardDeck } from '../../extension/cards';
import { Button } from 'semantic-ui-react';

export type DecksPanelProps = {
    color: string;
    activeDeck: CardDeck;
    decks: CardDeck[];
    onClickHandler: (deck: CardDeck) => void;
};

const DecksPanel: React.SFC<DecksPanelProps> = props => {
    const createDeckTabs = (deck: CardDeck) => {
        const selected = deck === props.activeDeck;
        return (
            <div 
                className={selected ? 'decktab selected': 'decktab normal'}
                style={{backgroundColor: selected ? props.color: props.color}}
            >
                <Button 
                    onClick={() => props.onClickHandler(deck)}
                >
                    {deck.info.name}
                </Button>
            </div>
        );
    }
    return (
        <div className='decksPanel'>
            <div className='title'>
                <h1>Decks</h1>
            </div>
            <div className='tabs'>
                {props.decks.map(createDeckTabs)}
            </div>
        </div>
    );
};

export default DecksPanel;