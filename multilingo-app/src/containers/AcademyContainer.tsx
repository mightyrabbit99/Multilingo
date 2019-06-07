import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

import Academy, { IDispatchProps, IStateProps } from '../components/Academy';
import { IState } from '../reducers/states';
import { Action as ReduxAction } from 'redux';

const mapStateToProps: MapStateToProps<IStateProps, {}, IState> = state => ({
  activeTab: 1
});

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, {}> = (dispatch: Dispatch<ReduxAction>) =>
  bindActionCreators(
    {

    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Academy));