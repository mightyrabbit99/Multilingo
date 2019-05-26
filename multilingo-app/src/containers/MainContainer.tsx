import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

import Main, { MainDispatchProps, MainStateProps } from '../components/Main';
import { IState } from '../reducers/states';
import { Action as ReduxAction } from 'redux';


const mapStateToProps: MapStateToProps<MainStateProps, {}, IState> = state => ({
  title: 'dd'
});

const mapDispatchToProps: MapDispatchToProps<MainDispatchProps, {}> = (dispatch: Dispatch<ReduxAction>) =>
  bindActionCreators(
    {

    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));