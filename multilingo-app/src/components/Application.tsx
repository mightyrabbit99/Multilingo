import * as React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";

import Main from '../containers/MainContainer';
import CardList from '../containers/CardListContainer';

import LoginBar, { LoginBarProps } from "./LoginBar";
import { CardDeck, defaultDeck } from "../extension/cards";

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
}

class Application extends React.Component<IApplicationProps, {}> {
  public componentDidMount() {
	}

  public render() {
		const currentLoginBarProps: LoginBarProps = {
			handleBackToMain: this.props.handleBackToMain,
			name: ["Home", "MyDecks", "Play", "Profile"],
			activeIndex: 0,
			fixed: false,
		};
    return (
      <div className="Application">
        <LoginBar {...currentLoginBarProps} />
          <Switch>
            <Route path="/main" component={toMain(this.props)} />
						<Route path="/cardlist" component={toCardList(this.props)} />
            <Route exact={true} path="/" render={this.redirectToMain} />
          </Switch>
      </div>
    );
  }

  private redirectToMain = () => <Redirect to="/main" />;
}

const toMain = (props: IApplicationProps) => { 
	console.log(props);
	return () => <Main />;
}

const toCardList = (props: IApplicationProps) => {
	console.log(props);
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
