// import { WorkspaceLocation, WorkspaceLocations } from '../actions/workspaces';
import {CardDeck, sampleDeck} from '../extension/cards';

export interface IState {
  readonly main: IMainState;
  readonly cardlist: ICardListState;
  readonly test: ITestState;
  readonly result: IResultState;
  readonly user: IUserState;
}

export interface IMainState {
  title: string;
  decks: CardDeck[];
  selectedDeck: CardDeck | null;
}

export interface ICardListState {

}

export interface ITestState {

}

export interface IResultState {

}

export interface IUserState {

}

const defaultMain: IMainState = {
  title: "aaa",
  decks: sampleDeck(),
  selectedDeck: null
};

const defaultUserState: IUserState = {};

const defaultCardListState: ICardListState = {};

const defaultTestState: ITestState = {};

const defaultResultState: IResultState = {};

export const defaultState: IState = {
  main: defaultMain,
  cardlist: defaultCardListState,
  test: defaultTestState,
  result: defaultResultState,
  user: defaultUserState
}