import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch, Action as ReduxAction } from 'redux';

import CardList, { CardListDispatchProps, CardListStateProps } from '../components/cardlist';
import { IState } from '../reducers/states';
import { addCardToDeck, selectDeck, toTest } from '../actions/session';

const mapStateToProps: MapStateToProps<CardListStateProps, {}, IState> = state => ({
  color: state.main.colour,
  title: 'asas',
  decks: state.session.decks,
	selectedDeck: state.session.selectedDeck,
	selectedCard: state.session.selectedCard,
	newCard: state.session.newCard
});

const mapDispatchToProps: MapDispatchToProps<CardListDispatchProps, {}> = (dispatch: Dispatch<ReduxAction>) =>
  bindActionCreators<any, any>(
    {
			addCardToDeck: addCardToDeck,
			selectDeck: selectDeck,
			handleToTest: toTest
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardList));