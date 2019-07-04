import * as React from "react";
import { Button, Segment, Header } from "semantic-ui-react";

import { Question } from "../../extension/questions";
import { defaultCard } from "../../extension/cards";

export type QuestionBlockProps = {
  question: Question;
  markQues: (ans: string) => void;
};

const QuestionBlock: React.SFC<QuestionBlockProps> = props => {
  let mark = props.markQues;
  const genMCQQues = (question: string, options: string[]) => {
    const { userAns, getAnsCard } = props.question.answer;
    const optionButtons = options.map((op: string, i: number) => {
      return (
        <Button
          onClick={() => mark(op)}
          style={{
            backgroundColor:
              userAns === op
                ? getAnsCard() !== defaultCard && getAnsCard().back === op
                  ? "green"
                  : "red"
                : "grey"
          }}
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

  return genMCQQues(props.question.getQues() as string, props.question.option as string[]);
};

export default QuestionBlock;
