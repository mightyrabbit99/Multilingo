// import { WorkspaceLocation, WorkspaceLocations } from '../actions/workspaces';
import {
  CardDeck,
  defaultDeck,
  Card,
  defaultCard,
  demonstrationDecks
} from "../extension/cards";

export interface IState {
  readonly main: IMainState;
  readonly session: ISessionState;
  readonly test: ITestState;
}

export interface IMainState {
  colour: string;
  user: IUserState;
}

export interface ISessionState {
  decks: CardDeck[];
  newDeck: CardDeck | null;
  selectedDeck: CardDeck;
  newCard: Card | null;
  selectedCard: Card;
}

export interface ITestState {}

export interface IResultState {}

export interface IUserState {}

const defaultUserState: IUserState = {};

export const defaultSessionState: ISessionState = {
  decks: [],
  newDeck: null,
  selectedDeck: defaultDeck,
  newCard: null,
  selectedCard: defaultCard
};

export const defaultTestState: ITestState = {};

export const defaultMain: IMainState = {
  colour: "green",
  user: defaultUserState
};

export const defaultState: IState = {
  main: defaultMain,
  session: defaultSessionState,
  test: defaultTestState
};
