import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators, Dispatch } from "redux";

import { goToLogin, backToMain } from "../actions";

import Application, {
  IDispatchProps,
  IStateProps
} from "../components/Application";
import { IState } from "../reducers/states";
import { Action as ReduxAction } from "redux";

const mapStateToProps: MapStateToProps<IStateProps, {}, IState> = state => ({
  accessToken: "1",
  role: "ss",
  title: "dd",
  selectedDeck: state.session.selectedDeck
});

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, {}> = (
  dispatch: Dispatch<ReduxAction>
) =>
  bindActionCreators(
    {
      handleToLogin: goToLogin,
      handleBackToMain: backToMain
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Application)
);
