import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

import { saveTestSettings } from '../actions/session';


import Test, { TestDispatchProps, TestStateProps } from '../components/test';
import { IState } from '../reducers/states';
import { Action as ReduxAction } from 'redux';


const mapStateToProps: MapStateToProps<TestStateProps, {}, IState> = state => ({
	deck: state.session.selectedDeck,
	view: state.test.view,
	questionSettings: state.test.settings
});

const mapDispatchToProps: MapDispatchToProps<TestDispatchProps, {}> = (dispatch: Dispatch<ReduxAction>) =>
  bindActionCreators<any, any>(
    {
			saveSettings: saveTestSettings
    },
    dispatch
	);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Test));
