import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch, Action as ReduxAction } from 'redux';


import FillForm, { FillFormDispatchProps, FillFormStateProps, FormType} from './FillForm';
import { IState } from '../../../reducers/states';

import { Card, CardDeck } from '../../../extension/cards';


const mapStateToProps: MapStateToProps<FillFormStateProps, {}, IState> = state => ({
  currentCard: state.session.selectedCard,
  currentDeck: state.session.selectedDeck
});

const mapDispatchToProps: MapDispatchToProps<FillFormDispatchProps, {}> = (dispatch: Dispatch<ReduxAction>) =>
  bindActionCreators(
    {
      submitCardToDeck: (card: Card) => {},
			addNewDeck: (deck: CardDeck) => {},
  		amendCurrentCard: (card: Card) => {}
    },
    dispatch
  );

export default (type: FormType) => withRouter(connect(mapStateToProps, mapDispatchToProps)(FillForm(type)));
