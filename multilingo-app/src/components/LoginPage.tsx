import * as React from "react";
import { Button, Form } from "semantic-ui-react";

export interface LoginPageProps {}

export interface LoginPageState {}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  state = {};

  render() {
    return (
      <Form>
        <Form.Field>
          <label>Email</label>
          <input placeholder="your email..." />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder="your password..." />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default LoginPage;