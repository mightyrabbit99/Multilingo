import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

import { logOut } from '../actions';

import Application, { IDispatchProps, IStateProps } from '../components/Application';
import { IState } from '../reducers/states';
import { Action as ReduxAction } from 'redux';

/**
 * Provides the title of the application for display.
 * An object with the relevant properties must be
 * returned instead of an object of type @type {IApplicationProps},
 * as the routing properties of @type {RouteComponentProps} are
 * provided using the withRouter() method below.
 */
const mapStateToProps: MapStateToProps<IStateProps, {}, IState> = state => ({
  title: 'dd'
});

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, {}> = (dispatch: Dispatch<ReduxAction>) =>
  bindActionCreators(
    {
      handleLogOut: logOut

    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Application));
