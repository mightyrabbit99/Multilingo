// import { WorkspaceLocation, WorkspaceLocations } from '../actions/workspaces';
import { CardDeck, sampleDeck } from '../extension/cards';

export interface IState {
  readonly main: IMainState;
  readonly cards: ICardsState;
  readonly test: ITestState;
}

export interface IMainState {
	colour: string;
	user: IUserState
}

export interface ICardsState {
  decks: CardDeck[];
  selectedDeck: CardDeck;
}

export interface ITestState {

}

export interface IResultState {

}

export interface IUserState {

}

const defaultUserState: IUserState = {};

export const defaultCardsState: ICardsState = {
	decks: sampleDeck(),
  selectedDeck: sampleDeck()[0]
};

export const defaultTestState: ITestState = {};

export const defaultMain: IMainState = {
	colour: 'green',
	user: defaultUserState
};

export const defaultState: IState = {
  main: defaultMain,
  cards: defaultCardsState,
  test: defaultTestState
}