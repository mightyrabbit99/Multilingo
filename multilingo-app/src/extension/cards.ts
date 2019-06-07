import { Card, CardCollection, Comment } from './types';

export function createCard(type: string, front: string[], back: string[]): Card {
    return {
        dateAdded: Date.now(),
        comments: [],
        info: {
            lastRevised: 0,
            lastResult: 0,
            correct: 0,
            wrong: 0,
            asked: 0
        },
        type: type,
        front: front,
        back: back
    };
}

export type DeckInfo = {
    name: string;
    dateAdded: number;
    description: string;
    comment: Comment[];
    lastRevised: number;
    lastResult: number;
}

export class CardDeck {
    public info: any = {}
    private collection: CardCollection = {};
    constructor(name: string) {
        this.info.name = name;
        this.info.dateAdded = Date.now();
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

export function sampleDeck(): CardDeck[] {
    let ans = [];
    ans.push(new CardDeck("deck1"));
    ans.push(new CardDeck("deck2"));
    ans.push(new CardDeck("deck3"));
    ans[0].addCard(createCard("a", ["haha"], ["shit"]));
    return ans;
}
