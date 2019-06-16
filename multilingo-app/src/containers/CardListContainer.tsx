import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';

import Main, { MainDispatchProps, MainStateProps } from '../components/main';
import { IState } from '../reducers/states';
import { Action as ReduxAction } from 'redux';

const mapStateToProps: MapStateToProps<MainStateProps, {}, IState> = state => ({
  color: state.cardlist.color
  title: state.cardlist.title,
  decks: state.cardlist.decks,
  selectedDeck: state.cardlist.selectedDeck
});

const mapDispatchToProps: MapDispatchToProps<MainDispatchProps, {}> = (dispatch: Dispatch<ReduxAction>) =>
  bindActionCreators<any, any>(
    {
      logout: () => {}
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));