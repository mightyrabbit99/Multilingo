import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

import Main, { MainDispatchProps, MainStateProps } from '../components/main';
import { IState } from '../reducers/states';
import { Action as ReduxAction } from 'redux';
import { selectDeck, addDeck } from '../actions';

const mapStateToProps: MapStateToProps<MainStateProps, {}, IState> = state => ({
  title: 'state.main.title',
	decks: state.session.decks,
	newDeck: state.session.newDeck
});

const mapDispatchToProps: MapDispatchToProps<MainDispatchProps, {}> = (dispatch: Dispatch<ReduxAction>) =>
  bindActionCreators<any, any>(
    {
			logout: () => {},
			handleSelectDeck: selectDeck,
			handleAddDeck: addDeck
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));