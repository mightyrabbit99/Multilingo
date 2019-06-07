import * as React from 'react';
import MCQ, { MCQProps } from './questions/MCQ';

export type WorkspaceProps = {
  // Either editorProps or mcqProps must be provided

};

const testingQuesProp: MCQProps = {
  id: 2,
  title: "string",
  question: "string",
  answerChecker: (answer: string) => answer === "aaa",
  choices: ["sss", "aaa", "bbb"]
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