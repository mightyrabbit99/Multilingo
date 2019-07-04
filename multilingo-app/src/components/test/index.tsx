import * as React from "react";
import { RouteComponentProps } from "react-router";

import { CardDeck } from "../../extension/cards";
import { Question } from "../../extension/questions";
import QuestionBlock from "./QuestionBlock";

import { Container } from 'semantic-ui-react';

export interface TestProps extends TestDispatchProps, TestStateProps, RouteComponentProps<{}> {}

export interface TestStateProps {
  deck: CardDeck;
  view: TestPaperView;
  questions: Question[];
}

export interface TestDispatchProps {
}

export enum TestPaperView {
  viewWhole = "viewWhole",
  viewQues = "viewQues"
}

type TestState = {
  correct: boolean[];
};

class Test extends React.Component<TestProps, TestState> {
  constructor(props: TestProps) {
    super(props);
    this.state = {
      correct: []
    };
  }

  public render() {
    const markFunc = (ques: Question, i: number) => (ans: string) =>
      this.setState(state => {
        state.correct[i] = ques.answer.getMark(ans);
        return state;
      });
    return (
      <Container className="test" style={{ margin: 20 }}>
        {this.props.questions.map((val: Question, id: number) => (
          <QuestionBlock question={val} markQues={markFunc(val, id)} key={id} />
        ))}
      </Container>
    );
  }
}

export default Test;
