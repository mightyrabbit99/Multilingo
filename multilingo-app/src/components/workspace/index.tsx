import * as React from 'react';
import MCQ, { MCQProps } from './questions/MCQ';

export type WorkspaceProps = {
  // Either editorProps or mcqProps must be provided

};

const testingQuesProp: MCQProps = {
  id: 1,
  title: 'svdavas',
  question: 'vasdv',
  answer: 'vasdvsadasvd',
  choices: ['ch1', 'ch2', 'ch3'],
  answerType: 1,
}

class Workspace extends React.Component<WorkspaceProps, {}> {
  public render() {
    return (
      <div className="workspace">
        <MCQ {...testingQuesProp} />
      </div>
    );
  }
}

export default Workspace;