import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';

import Academy from '../containers/AcademyContainer';
import NotFound from '../components/NotFound'


export interface IApplicationProps extends IDispatchProps, IStateProps, RouteComponentProps<{}> {}

export interface IStateProps {
  title: string;
}

export interface IDispatchProps {
  handleLogOut: () => void;
}

class Application extends React.Component<IApplicationProps, {}> {
  public componentDidMount() {

  }

  public render() {
    return (
      <div className="Application">
        <div className="Application__main">
          <Switch>
            <Route path="/main" component={toAcademy(this.props)} />
            <Route path="/academy" component={Academy} />
            <Route exact={true} path="/" render={this.redirectToMain} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }

  private redirectToMain = () => <Redirect to="/main" />;
}

/**
 * A user routes to /academy,
 *  1. If the user is logged in, render the Academy component
 *  2. If the user is not logged in, redirect to /login
 */
const toAcademy = (props: IApplicationProps) => () => <Redirect to="/academy" />


export default Application;
