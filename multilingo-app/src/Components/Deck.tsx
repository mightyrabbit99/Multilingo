import * as React from 'react';

export type DeckProps = {
    title: string;
    description: string;
    noOfWords: number;
    lastRevised: Date;
    lastResult: number;
    id: number;
}

class Deck extends React.Component<DeckProps, {}> {
    public render() {
        return (
            <div className={"deck" + this.props.id}>
            
            
            
            
            </div>
        );
    }
}

export default Deck;