import { Card, CardCollection, Comment } from './types';

export function createCard(type: string, front: string[], back: string[]): Card {
    return {
        dateAdded: Date.now(),
        comments: [],
        info: {
            correct: 0,
            wrong: 0,
            asked: 0
        },
        type: type,
        front: front,
        back: back
    };
}

export class CardDeck {
    public name: string;
    public dateAdded: number;
    public comment: Comment[];
    private collection: CardCollection = {};
    constructor(name: string) {
        this.name = name;
        this.dateAdded = Date.now();
    }
    public addCard(card: Card) {
        if(this.collection[card.type] === undefined) {
            this.collection[card.type] = [];
        }
        this.collection[card.type].unshift(card);
    }

    public mergeDeck(anotherDeck: CardDeck) {
        for(let key in anotherDeck.collection) {
            if (this.collection[key] === undefined) {
                this.collection[key] = anotherDeck.collection[key].slice();
            } else {
                for(let i = 0; i < anotherDeck.collection[key].length; i++) {
                    if(!this.collection[key].includes(anotherDeck.collection[key][i])) {
                        this.collection[key].unshift(anotherDeck.collection[key][i]);
                    }
                }
            }
        }
    }
}

