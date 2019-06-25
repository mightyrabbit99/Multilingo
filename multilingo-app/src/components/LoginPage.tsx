import * as React from "react";
import {
  Button,
  Form,
  Segment,
  Grid,
  Divider,
  Header,
  Icon,
  Search
} from "semantic-ui-react";

import { RouteComponentProps } from "react-router";

export interface LoginPageProps
  extends LoginPageStateProps,
    LoginPageDispatchProps,
    RouteComponentProps<{}> {}

export interface LoginPageStateProps {}

export interface LoginPageDispatchProps {
  handleLogin: () => void;
}

export interface LoginPageState {}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  state = {};

  render() {
    return (
      <div>
        <Segment
          placeholder
          color="green"
          style={{ margin: "10vh 30vw 0vh 30vw" }}
        >
          <Grid rows={2} stackable textAlign="center">
            <Grid.Column verticalAlign="middle">
              <Grid.Row>
                <Form>
                  <Form.Field>
                    <label>Email</label>
                    <input placeholder="your email" />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input placeholder="your password" />
                  </Form.Field>
                  <Button type="submit">Register</Button>
                </Form>
              </Grid.Row>
              <Divider horizontal>Or</Divider>

              <Grid.Row>
                <Button color="olive">
                  <Icon name="google" style={{ marginRight: "0.8em" }} />
                  Sign Up with Google{" "}
                </Button>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    );
  }
}

export default LoginPage;
