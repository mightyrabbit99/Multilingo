import * as React from "react";
import { Item, Button } from "semantic-ui-react";

import { Question } from "../../extension/questions";

export type QuestionBlockProps = {
	question: Question;
	markQues: (ans: string) => void;
}

const QuestionBlock: React.SFC<QuestionBlockProps> = props => {
	let ques: string | string[] = props.question.getQues();
	let mark = props.markQues;
	const genMCQQues = (question: string, answer: string, options: string[]) => {
		const onClickFunc = () => {

		}
		const optionButtons = options.map((op: string) => (
			<Button onClick={onClickFunc}>

			</Button>
		));
		return (
			<Item>
				<Item.Content>
					<Item.Header as='a'>{question}</Item.Header>
					<Item.Description>

					</Item.Description>
				</Item.Content>
			</Item>
		)
	}

	return (
		<div></div>
	)
}