import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Workspace, { WorkspaceProps } from './workspace';

export interface IPlaygroundProps extends IDispatchProps, IStateProps, RouteComponentProps<{}> {}

export interface IStateProps {
  activeTab: number;
}

export interface IDispatchProps {
  handleBrowseHistoryDown: () => void;

}

type PlaygroundState = {
  isGreen: boolean;
};

class Playground extends React.Component<IPlaygroundProps, PlaygroundState> {

  constructor(props: IPlaygroundProps) {
    super(props);
    this.state = { isGreen: false };
  }

  public render() {
    const workspaceProps: WorkspaceProps = {
      controlBarProps: {
      },
      sideContentHeight: 100,
      sideContentProps: {
      }
    };
    return (
        <Workspace {...workspaceProps} />
    );
  }

}


export default Playground;
