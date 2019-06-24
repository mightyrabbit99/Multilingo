import * as React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";

import Main from '../containers/MainContainer';
import CardList from '../containers/CardListContainer';

import NavigationBar, { NavigationBarProps } from "./NavigationBar";
import { CardDeck, defaultDeck } from "../extension/cards";
import LoginPage from "./LoginPage";

export interface IApplicationProps
  extends IDispatchProps,
    IStateProps,
    RouteComponentProps<{}> {}

export interface IStateProps {
  accessToken: string;
  role: string;
	title: string;
	selectedDeck: CardDeck | undefined;
}

export interface IDispatchProps {
	handleBackToMain: () => void;
	handleToLogin: () => void;
}

class Application extends React.Component<IApplicationProps, {}> {
  public componentDidMount() {
	}

  public render() {
		const currentNavigationBarProps: NavigationBarProps = {
			handleToLogin: this.props.handleToLogin,
			handleBackToMain: this.props.handleBackToMain,
			name: ["Home", "MyDecks", "Play", "Profile"],
			activeIndex: 0,
			fixed: false,
		};
    return (
      <div className="Application">
        <NavigationBar {...currentNavigationBarProps} />
          <Switch>
            <Route path="/main" component={toMain(this.props)} />
						<Route path="/cardlist" component={toCardList(this.props)} />
						<Route path="/login" component={LoginPage} />
            <Route exact={true} path="/" render={this.redirectToMain} />
          </Switch>
      </div>
    );
  }

  private redirectToMain = () => <Redirect to="/main" />;
}

const toMain = (props: IApplicationProps) => { 
	return () => <Main />;
}

const toCardList = (props: IApplicationProps) => {
	return props.selectedDeck === defaultDeck
		? () => <Redirect to='/main'/>
		: () => <CardList/>
}


/**
 * A user routes to /academy,
 *  1. If the user is logged in, render the Academy component
 *  2. If the user is not logged in, redirect to /login
 */

export default Application;
