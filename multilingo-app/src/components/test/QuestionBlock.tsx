import * as React from "react";
import { Button, Segment, Header, Form } from "semantic-ui-react";

import { Question, QuestionType } from "../../extension/questions";
import { defaultCard } from "../../extension/cards";

export type QuestionBlockProps = {
  question: Question;
  markQues: (ans: string) => void;
};

class QuestionBlock extends React.Component<QuestionBlockProps, { form: Array<any> }> {
  constructor(props: QuestionBlockProps) {
    super(props);
    this.state = {
      form: props.question.option ? props.question.option.map(s => "") : [""]
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
      const { getAnsCard, marked } = props.question.answer;
      const handleOnChange = (i: number) => (e: any) => {
        let val = e.target.value;
        this.setState(state => {
          state.form[i] = val;
          return state;
        });
      };
      const quesElem =  question.map((op: string, i: number) =>
            i === question.length - 1 ? (
              <Form.Field key={i}>
                <label>{op}</label>
              </Form.Field>
            ) : (
              <Form.Field
                key={i}
                error={getAnsCard() !== defaultCard && getAnsCard().back !== this.state.form[i]}
              >
                <label>{op}</label>
                <input name={op} value={this.state.form[i]} onChange={handleOnChange(i)} disabled={marked} />
              </Form.Field>
            )
          );

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
        </div>
      );
    };

    switch (props.question.type) {
      case QuestionType.MCQ:
        return genMCQQues(props.question.getQues() as string, props.question.option as string[]);
      case QuestionType.Fillinblanks:
        return genFillInBlankQues(props.question.getQues() as string[], props.question.option);
      default:
        return null;
    }
  }
}

export default QuestionBlock;
