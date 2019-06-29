import * as React from "react";
import { RouteComponentProps } from "react-router";

import { CardDeck } from "../../extension/cards";
import { Question } from "../../extension/questions";

export interface TestProps extends TestDispatchProps, TestStateProps, RouteComponentProps<{}> {}

export interface TestStateProps {
	deck: CardDeck;
	view: TestPaperView;
	questions: Question[];
}

export interface TestDispatchProps {
	loadQuestions: () => {};
}

export enum TestPaperView {
	viewWhole =  "viewWhole",
	viewQues = "viewQues"
}

type TestState = {
	correct: boolean[];
}

class Test extends React.Component<TestProps, TestState> {
	constructor(props: TestProps) {
		super(props);
		this.state = {
			correct: []
		}
	}

	public render() {
		return (
			<div className="test"></div>
		)
	}
}

export default Test;