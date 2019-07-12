import * as React from "react";
import { Button, Segment, Header, Form, Input } from "semantic-ui-react";

import { Question, QuestionType } from "../../extension/questions";
import { defaultCard } from "../../extension/cards";

export type QuestionBlockProps = {
  question: Question;
  markQues: (ans: string) => void;
};

class QuestionBlock extends React.Component<QuestionBlockProps, { form: any }> {
  constructor(props: QuestionBlockProps) {
    super(props);
    this.state = {
      form: []
    };
  }

  public render() {
    let props = this.props;
    let mark = props.markQues;
    const genMCQQues = (question: string, options: string[]) => {
      const { userAns, getAnsCard, marked } = props.question.answer;
      const optionButtons = options.map((op: string, i: number) => {
        return (
          <Button
            onClick={() => mark(op)}
            style={{
              backgroundColor:
                getAnsCard() !== defaultCard && getAnsCard().back === op
                  ? "green"
                  : userAns === op
                  ? "red"
                  : "grey"
            }}
            disabled={marked}
            key={i}
          >
            {op}
          </Button>
        );
      });
      return (
        <div className="question">
          <Segment attached="top">
            <Header>{question}</Header>
          </Segment>
          <Segment attached="bottom">{optionButtons}</Segment>
        </div>
      );
    };

    const genFillInBlankQues = (question: string[], options?: string[]) => {
      const { userAns, getAnsCard, marked } = props.question.answer;
      const handleOnChange = (i: number) => (e: any) =>
        this.setState(state => {
          state.form[i] = e.target.value;
          return state;
        });
      const quesElem = options
        ? question.map((op: string, i: number) =>
            i === question.length - 1 ? (
              <Form.Field key={i}>
                <label>{op}</label>
              </Form.Field>
            ) : (
              <Form.Field key={i}>
                <label>{op}</label>
                <Input onChange={handleOnChange(i)} />
              </Form.Field>
            )
          )
        : question.map((op: string, i: number) =>
            i === question.length - 1 ? (
              <Form.Field key={i}>
                <label>{op}</label>
              </Form.Field>
            ) : (
              <Form.Field key={i}>
                <label>{op}</label>
                <Input onChange={handleOnChange(i)} />
              </Form.Field>
            )
          );
      const optionButtons = options
        ? options.map((op: string, i: number) => {
            return (
              <Button
                onClick={() => mark(op)}
                style={{
                  backgroundColor:
                    getAnsCard() !== defaultCard && getAnsCard().back === op
                      ? "green"
                      : userAns === op
                      ? "red"
                      : "grey"
                }}
                disabled={marked}
                key={i}
              >
                {op}
              </Button>
            );
          })
        : null;

      const handleOnSubmit = () => {
        let ans = "";
        for (let i = 0; i < this.state.form.length; i++) {
          ans += question[i];
          ans += this.state.form[i];
        }
        ans += question[question.length - 1];
        mark(ans);
      };

      const segmentTop = options ? (
        <Form onSubmit={handleOnSubmit}>
          <Form.Group inline>{quesElem}</Form.Group>
          <Button type="submit" style={{ align: "right" }}>
            Submit
          </Button>
        </Form>
      ) : (
        <Form onSubmit={handleOnSubmit}>
          <Form.Group inline>{quesElem}</Form.Group>
          <Button type="submit" style={{ align: "right" }}>
            Submit
          </Button>
        </Form>
      );
      return (
        <div className="question">
          <Segment attached="top">{segmentTop}</Segment>
          <Segment attached="bottom">{optionButtons}</Segment>
        </div>
      );
    };

    switch (props.question.type) {
      case QuestionType.MCQ:
        return genMCQQues(props.question.getQues() as string, props.question.option as string[]);
      case QuestionType.Fillinblanks:
				console.log(props.question.getQues());
        return genFillInBlankQues(props.question.getQues() as string[], props.question.option);
      default:
        return null;
    }
  }
}

export default QuestionBlock;
