import * as React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";

import CardListContainer from '../containers/CardListContainer';

import LoginBar, { defaultLoginBarProps } from "./LoginBar";

export interface IApplicationProps
  extends IDispatchProps,
    IStateProps,
    RouteComponentProps<{}> {}

export interface IStateProps {
  accessToken: string;
  role: string;
  title: string;
}

export interface IDispatchProps {
  handleLogOut: () => void;
}

class Application extends React.Component<IApplicationProps, {}> {
  public componentDidMount() {}

  public render() {
    return (
      <div className="Application">
				<div id="screenFiller" style={{position: 'fixed', top: 0, right: 0, bottom: 0, left: 0}} />
        <LoginBar {...defaultLoginBarProps} />
        <div className="Application_main">
          <CardListContainer />
          {/*<Switch>
            <Route path="/main" component={toMain(this.props)} />
            <Route exact={true} path="/" render={this.redirectToMain} />
            <Route component={NotFound} />
          </Switch>*/}
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

export default Application;
