import { Comment } from "./questions";

//Cards
/**
 * Card is categorised by their types and back to simplify search
 * Example: Card Category-- Biology, Physics, Math
 *          Card Back-- The content that need to be memorised is written on the back
 *								Examples, Explanations is at front
 * Cards with the same back can combine to from a single card with multiple front.
 */

export enum CardType {
	Expl = "Explanation",
	Ex ="Example"
}

const initialCardInfo = {
  lastRevised: 0,
  lastResult: 0,
  correct: 0,
  wrong: 0,
  asked: 0
};

export class Card {
  constructor(category: string, front: string, back: string, type: CardType = CardType.Expl) {
    this.category = category;
    this.front = front;
    this.back = back;
    this.type = type;
    this.originalCard = null;
    this.dateAdded = Date.now();
  }
  private originalCard: Card | null;
  public dateAdded: number;
  public comments: Comment[] = [];
  public description: string = "";
  public info: {
    lastRevised: number;
    lastResult: number;
    correct: number;
    wrong: number;
    asked: number;
    [key: string]: any;
  } = initialCardInfo;
  public category: string;
  public type: CardType;
  public front: string;
  public back: string;
  public equals(anotherCard: Card): boolean {
    return (
      this.front === anotherCard.front &&
      this.back === anotherCard.back &&
      this.type === anotherCard.type
    );
  }

  public isEmpty(): boolean {
    return this.front === "" || this.back === "";
  }

  public copyCard(): Card {
    let card = new Card(this.category, this.front, this.back, this.type);
    card.originalCard = this;
    return card;
  }

  public amendOriginal(): boolean {
    if (this.originalCard === null || this.isEmpty()) return false;
    this.originalCard.front = this.front;
    this.originalCard.back = this.back;
    this.originalCard.category = this.category;
    return true;
  }

  [key: string]: any;
}

/**
 * Examples of explanation card
 */

<<<<<<< HEAD
export const exampleExplCard1: Card = createCard("Animal name", "<n> A female deer", "Doe", CardType.Expl);
=======
export const exampleExplCard1: Card = createCard(
  "Animal name",
  "<n> A female deer",
  "Doe",
  "Explanation"
);
>>>>>>> 4c66f84d6c632ee54e0230f8849869ce9cc8beba

export const exampleExplCard2: Card = createCard(
  "Animal name",
  "Deer (singular and plural) are the hoofed ruminant mammals forming the family Cervidae. The two main" +
    " groups of deer are the Cervinae, including the muntjac, the elk (wapiti), the fallow deer, and the " +
    "chital; and the Capreolinae, including the reindeer (caribou), the roe deer, and the moose.",
  "Doe",
  CardType.Expl
);

/**
 * Example of an example card
 */

<<<<<<< HEAD
export const exampleExampleCard: Card = createCard("Animal name", "I have a pet doe", "Doe", CardType.Ex);
=======
export const exampleExampleCard: Card = createCard(
  "Animal name",
  "I have a pet doe",
  "Doe",
  "Example"
);
>>>>>>> 4c66f84d6c632ee54e0230f8849869ce9cc8beba

/**
 * Card is categorised by category and word to simplify search
 */

export type CardCollection = {
  byCategory: { [type: string]: Card[] };
  byBack: { [back: string]: Card[] };
};

export function createCard(
  category: string,
  front: string,
  back: string,
  type: CardType = CardType.Expl
): Card {
  return new Card(category, front, back, type);
}

/**
 * Deck of card
 */

export class CardDeck {
  public info: {
    name: string;
    category: string;
    dateAdded: number;
    [key: string]: any;
  };
  public cards: Card[];
  private collection: CardCollection = {
    byBack: {},
    byCategory: {}
  };
  constructor(name: string, category: string = "") {
    this.info = { name: name, category: category, dateAdded: Date.now() };
    this.cards = [];
  }

  public isEmpty(): boolean {
    return this.info.name === "" && this.info.category === "";
  }
  public addCard(card: Card) {
    if (this.cards.includes(card)) return;
    if (this.collection.byCategory[card.type] === undefined) {
      this.collection.byCategory[card.type] = [];
    }
    if (this.collection.byBack[card.back] === undefined) {
      this.collection.byBack[card.back] = [];
    }
    this.collection.byCategory[card.type].unshift(card);
    this.collection.byBack[card.back].unshift(card);
    this.cards.push(card);
  }

  public mergeDeck(anotherDeck: CardDeck) {
    for (let i = 0; i < anotherDeck.cards.length; i++) {
      this.addCard(anotherDeck.cards[i]);
    }
  }
}

export function createDeck(
  name: string,
  category: string,
  ...cards: Card[]
): CardDeck {
  let deck = new CardDeck(name, category);
  cards.forEach((value: Card) => deck.addCard(value));
  return deck;
}

export const exampleDeck: CardDeck = createDeck(
  "Chapter 3.5: Animals",
  "Biology",
  exampleExplCard1,
  exampleExampleCard
);

export const defaultDeck: CardDeck = new CardDeck("___default");

export const defaultCard: Card = createCard("", "", "");

defaultDeck.addCard(defaultCard);

export function sampleDecks(): CardDeck[] {
  let ans = [];
  ans.push(exampleDeck);
  ans.push(new CardDeck("deck2"));
  ans[1].addCard(createCard("a", "haha", "shit"));
  ans[1].addCard(createCard("a", "haha", "shit"));
  return ans;
}

export const demonstrationDecks: CardDeck[] = sampleDecks();
