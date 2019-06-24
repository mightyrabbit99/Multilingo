import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

import CardList, { CardListDispatchProps, CardListStateProps } from '../components/cardlist';
import { IState } from '../reducers/states';
import { Action as ReduxAction } from 'redux';

const mapStateToProps: MapStateToProps<CardListStateProps, {}, IState> = state => ({
  color: state.main.colour,
  title: 'asas',
  decks: state.session.decks,
	selectedDeck: state.session.selectedDeck,
	selectedCard: state.session.selectedCard
});

const mapDispatchToProps: MapDispatchToProps<CardListDispatchProps, {}> = (dispatch: Dispatch<ReduxAction>) =>
  bindActionCreators<any, any>(
    {
      logout: () => {}
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardList));