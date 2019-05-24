import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

import {
  WorkspaceLocation,
  browseReplHistoryDown
} from '../actions';
import Academy, { IDispatchProps, IStateProps } from '../components/Academy';
import { IState } from '../reducers/states';
import { Action as ReduxAction } from 'redux';

const mapStateToProps: MapStateToProps<IStateProps, {}, IState> = state => ({
  activeTab: 1
});

const location: WorkspaceLocation = 'academy';

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, {}> = (dispatch: Dispatch<ReduxAction>) =>
  bindActionCreators(
    {
      handleBrowseHistoryDown: () => browseReplHistoryDown(location)
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Academy));