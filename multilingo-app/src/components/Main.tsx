import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';


import Academy from '../containers/AcademyContainer';
import NotFound from '../components/NotFound'

import Deck from '../components/main/Deck'

export interface MainProps extends MainDispatchProps, MainStateProps, RouteComponentProps<{}> {}

export interface MainStateProps {
  title: string;
}

export interface MainDispatchProps {
}

type MainState = {
    selectedDeck: Deck;
}

class Main extends React.Component<MainProps, MainState> {
    constructor(state: MainProps) {
        super(state);
    }

    public componentDidMount() {

    }

  public render() {
    return (
      <div className="Application">
        <div className="Application__main">
          <Switch>
            <Route path="/main" component={toWordCollection(this.props)} />
            <Route path="/academy" component={Academy} />
            <Route exact={true} path="/" render={this.redirectToMain} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }

}

const toWordCollection = (props: IApplicationProps) =>
  props.accessToken === undefined || props.role === undefined
    ? () => <Redirect to="/login" />
    : () => <Academy accessToken={props.accessToken} role={props.role!} />;


export default Main;
