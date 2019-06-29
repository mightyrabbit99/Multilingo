import * as React from "react";
import { Item, Button } from "semantic-ui-react";

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
    const optionButtons = options.map((op: string) => {
      return (
        <Button
          onClick={() => mark(op)}
          style={{
            backgroundColor:
              userAns === op ? ((getAnsCard() !== defaultCard && getAnsCard().back === op) ? "green" : "red") : "grey"
          }}
        />
      );
    });
    return (
      <Item>
        <Item.Content>
          <Item.Header as="a">{question}</Item.Header>
          <Item.Description>{optionButtons}</Item.Description>
        </Item.Content>
      </Item>
    );
  };

  return genMCQQues((props.question.getQues() as string), (props.question.option as string[]));
};

export default QuestionBlock;