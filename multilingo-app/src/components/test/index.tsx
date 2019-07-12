import * as React from "react";
import { RouteComponentProps } from "react-router";

import { CardDeck } from "../../extension/cards";
import { Question, QuestionGeneratorSettings, QuestionGenerator } from "../../extension/questions";
import QuestionBlock from "./QuestionBlock";
import ControlBar, { ControlBarProps } from "../commons/ControlBar";

import { Container } from 'semantic-ui-react';

export interface TestProps extends TestDispatchProps, TestStateProps, RouteComponentProps<{}> {}

export interface TestStateProps {
  deck: CardDeck;
  view: TestPaperView;
	questionSettings: QuestionGeneratorSettings;
}

export interface TestDispatchProps {
	saveSettings: (settings: QuestionGeneratorSettings) => void;
}

export enum TestPaperView {
  viewWhole = "viewWhole",
  viewQues = "viewQues"
}

type TestState = {
	correct: boolean[];
	settings: QuestionGeneratorSettings;
	generator: QuestionGenerator;
};

class Test extends React.Component<TestProps, TestState> {
  constructor(props: TestProps) {
    super(props);
    this.state = {
			correct: [],
			settings: props.questionSettings,
			generator: new QuestionGenerator(props.questionSettings),
		};
		this.questions = this.state.generator.generateQuestions(this.props.deck);
	}

	private questions: Question[];

  public render() {
    let { questions } = this;
		const markFunc = (ques: Question, i: number) => (ans: string) =>
      this.setState(state => {
        state.correct[i] = ques.answer.getMark(ans);
        return state;
			});
		let controlBarProps: ControlBarProps = {
			location: "Test",
			color: "green",
			currentDeck: this.props.deck,
			currentSettings: this.props.questionSettings,
			saveSettings: (settings: QuestionGeneratorSettings) => {
				this.props.saveSettings(settings);
				this.setState(state => {
					let newGenerator = new QuestionGenerator(settings);
					this.questions = newGenerator.generateQuestions(this.props.deck);
					return {...state, settings: settings, generator: newGenerator};
				});
			},
			modalOpen: true
		};
		return (
			<div>
      <Container className="test" style={{ margin: 20 }}>
        {questions.map((val: Question, id: number) => (
          <QuestionBlock question={val} markQues={markFunc(val, id)} key={id} />
				))}
      </Container>
			<ControlBar {...controlBarProps} />
			</div>
    );
  }
}

export default Test;
