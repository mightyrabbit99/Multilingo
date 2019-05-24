import * as React from 'react';
// import _ from 'lodash'
import { Grid, Button } from 'semantic-ui-react'

export type MCQProps = {
    id: number;
    title: string;
    question: string;
    answer: string;
    choices: string[];
    answerType: number;
}

type State = {
    choicesCopy: string[];
    pickedAns : number | null;
}

class MCQ extends React.Component<MCQProps, State> {
    constructor(props: MCQProps) {
        super(props);
        this.state = {
            pickedAns : null,
            choicesCopy : this.random(this.props.choices)
        };
    }
    
    public render() {
        return (
            <Grid divided='vertically'>
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <div className='question'>
                            Pellentesque habitant morbi tristique senectus.
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={1}>
                    <Grid.Column>
                    <div className='choices'> 
                        {this.createChoice(this.state.choicesCopy, this.props.answer)}
                    </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    private random = (choices: string[]) => {
        let choicesCopy = choices.concat([]);
        choicesCopy.push(this.props.answer);
        let temp: string;
        for(let n = choicesCopy.length - 1; n >= 0; n--) {
            let i = Math.floor(Math.random() * choices.length);
            temp = choicesCopy[n];
            choicesCopy[n] = choicesCopy[i];
            choicesCopy[i] = temp;
        }
        return choicesCopy;
    }

    private createChoice = (choices: string[], answer: string) => {
        const onButtonClickFactory = (i: number) => (e: any) => {
            this.setState({
                ...this.state,
                pickedAns: i
            });
        }

        const checkColor = (i: number) => {
            if(this.state.pickedAns !== null) {
                if(choices[i] === answer) {
                    return 'green';
                } else {
                    if(this.state.pickedAns === i) {
                        return 'red';
                    } else {
                        return 'grey';
                    }
                }
            } else {
                return 'grey';
            }
        }
        const checkDisabled = () => this.state.pickedAns !== null;
        return choices.map((choice, i) => (
            <div className='choice-button'>
                <Button
                    key={i}
                    className="fluid ui button mcq-option"
                    onClick={onButtonClickFactory(i)}
                    color={checkColor(i)}
                    disabled={checkDisabled()}
                >
                {choice}
                </Button>
            </div>
        ));
    }
}

export default MCQ;