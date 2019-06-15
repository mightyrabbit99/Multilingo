import * as React from "react";
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Icon
} from "semantic-ui-react";

export type LoginBarProps = {
  name: string[];
  activeIndex: number;
  fixed: boolean;
};

export const defaultLoginBarProps: LoginBarProps = {
  name: ["Home", "MyDecks", "Play", "Profile"],
  activeIndex: 0,
  fixed: false
};

const LoginBar: React.SFC<LoginBarProps> = props => {
  const { fixed } = props
  return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Segment
            textAlign="center"
            style={{
              padding: "0.2em 0em",
              border: "0em",
              background: "green",
              marginBottom: "1em"
            }}
            vertical
          >
            <Menu
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <h1
                className="header"
                style={{
                  color: "white",
                  textAlign: "center",
                  margin: "auto",
                  fontFamily: "courier"
                }}
              >
                <a href="a" style={{ color: "white" }}>
                  MultiLingo
                  <Icon name="language" style={{ marginLeft: "0.1em" }} />
                </a>
              </h1>

              <Container>
                {/*props.name.map((name, id) => {
                  const active =
                    this.state.activeIndex === this.state.name.indexOf(name)
                      ? "active"
                      : "";
                  return (
                    <Menu.Item
                      as="a"
                      key={this.state.name.indexOf(name)}
                      className={active}
                      onClick={() =>
                        this.setState({
                          activeIndex: this.state.name.indexOf(name)
                        })
                      }
                    >
                      {name}
                    </Menu.Item>
                  );
                })*/}

                <Menu.Item position="right">
                  <Button as="a" inverted={!fixed}>
                    Log in
                    <Icon name="user" style={{ marginLeft: "0.3em" }} />
                  </Button>
                  <Button
                    as="a"
                    inverted={!fixed}
                    primary={fixed}
                    style={{ marginLeft: "0.5em" }}
                  >
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
      </Responsive>
    );
}

export default LoginBar;