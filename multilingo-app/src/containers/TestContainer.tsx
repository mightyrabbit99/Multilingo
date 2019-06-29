import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';


import Test, { TestDispatchProps, TestStateProps } from '../components/test';
import { IState } from '../reducers/states';
import { Action as ReduxAction } from 'redux';


const mapStateToProps: MapStateToProps<TestStateProps, {}, IState> = state => ({
	deck: state.session.selectedDeck,
	view: state.test.view,
	questions: state.test.getQuestions(state.session.selectedDeck, state.test.settings)
});

const mapDispatchToProps: MapDispatchToProps<TestDispatchProps, {}> = (dispatch: Dispatch<ReduxAction>) =>
  bindActionCreators<any, any>(
    {
			
    },
    dispatch
	);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Test));
