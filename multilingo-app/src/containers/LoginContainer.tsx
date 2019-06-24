import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';


import Login, { LoginPageDispatchProps, LoginPageStateProps } from '../components/LoginPage';
import { IState } from '../reducers/states';
import { Action as ReduxAction } from 'redux';


const mapStateToProps: MapStateToProps<LoginPageStateProps, {}, IState> = state => ({

});

const mapDispatchToProps: MapDispatchToProps<LoginPageDispatchProps, {}> = (dispatch: Dispatch<ReduxAction>) =>
  bindActionCreators<any, any>(
    {
      handleLogin: () => {}

    },
    dispatch
	);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
