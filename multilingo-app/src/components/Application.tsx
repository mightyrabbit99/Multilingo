import * as React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";

import Main from "../containers/MainContainer";
import Fab from "../components/Fab";
import NotFound from "../components/NotFound";

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
        <LoginBar {...defaultLoginBarProps} />
        <div className="Application_main">
          <Fab />
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
const toMain = (props: IApplicationProps) => () => <Main />;

export default Application;
