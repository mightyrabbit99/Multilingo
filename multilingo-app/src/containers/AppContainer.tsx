import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

import { logOut } from '../actions';

import Application, { IDispatchProps, IStateProps } from '../components/Application';
import { IState } from '../reducers/states';
import { Action as ReduxAction } from 'redux';


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
