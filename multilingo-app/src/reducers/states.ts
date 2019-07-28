// import { WorkspaceLocation, WorkspaceLocations } from '../actions/workspaces';
import {
  CardDeck,
  defaultDeck,
  Card,
  defaultCard,
  demonstrationDecks
} from "../extension/cards";
import { TestPaperView } from "../components/test";
import { QuestionGeneratorSettings, QuestionGenerator, Question } from "../extension/questions";
import Dict, { defaultDict, SearchResult, wordNotFound } from "../extension/dict";

export interface IState {
  readonly main: IMainState;
  readonly session: ISessionState;
	readonly test: ITestState;
	readonly dict: IDictState;
}

export interface IMainState {
  colour: string;
  user: IUserState;
}

export interface IDictState {
	searched: boolean;
	dictionary: Dict;
	searchResult: SearchResult;
	newCards: Card[];
}

export interface ISessionState {
  decks: CardDeck[];
  newDeck: CardDeck | null;
  selectedDeck: CardDeck;
  newCard: Card | null;
  selectedCard: Card;
}

export interface ITestState {
	view: TestPaperView;
	settings: QuestionGeneratorSettings;
	getQuestions: (deck: CardDeck, settings: QuestionGeneratorSettings) => Question[];
}

export interface IResultState {}

export interface IUserState {}

const defaultUserState: IUserState = {};

export const defaultSessionState: ISessionState = {
  decks: demonstrationDecks,
  newDeck: null,
  selectedDeck: defaultDeck,
  newCard: null,
  selectedCard: defaultCard
};

export const defaultTestState: ITestState = {
	view: TestPaperView.viewWhole,
	settings: {
		SameCategory: true,
		cards: defaultDeck.cards,
		MCQ: {
			noOfQuestion: 4,
			noOfOption: 4,
		},
		Fillinblanks: {
			noOfQuestion: 0,
			Withoptions: false,
			Casesensitive: false,
		},
		Rearrange : {
			noOfQuestion: 0
		}
	},
	getQuestions: (deck: CardDeck, settings: QuestionGeneratorSettings) => (new QuestionGenerator(settings)).generateQuestions(deck)
};

export const defaultMain: IMainState = {
  colour: "green",
  user: defaultUserState
};

export const defaultDictState: IDictState = {
	searched: false,
	dictionary: defaultDict,
	searchResult: wordNotFound,
	newCards: []
}

export const defaultState: IState = {
  main: defaultMain,
  session: defaultSessionState,
	test: defaultTestState,
	dict: defaultDictState
};
