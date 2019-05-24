import * as React from 'react';
import _ from 'lodash'
import { Grid, Button } from 'semantic-ui-react'

export type MCQProps = {
    id: number;
    title: string;
    question: string;
    answer: string;
    answerType: number;
}

class MCQ extends React.Component<MCQProps, {}> {
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
                        <Button>
                            <div className='answer'>
                                1. Fuck Pellentesque habitant morbi tristique senectus.
                            </div>
                        </Button>
                        <Button>
                            <div className='answer'>
                                1. Fuck Pellentesque habitant morbi tristique senectus.
                            </div>
                        </Button>
                        <Button>
                            <div className='answer'>
                                1. Fuck Pellentesque habitant morbi tristique senectus.
                            </div>
                        </Button>
                        <Button>
                            <div className='answer'>
                                1. Fuck Pellentesque habitant morbi tristique senectus.
                            </div>
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default MCQ;