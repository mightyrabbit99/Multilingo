import * as React from "react";
import {
  Button,
  Container,
  Menu,
  Icon
} from "semantic-ui-react";

export type LoginBarProps = {
	handleBackToMain: () => void;
  name: string[];
  activeIndex: number;
  fixed: boolean;
};

const LoginBar: React.SFC<LoginBarProps> = props => {
  const { fixed } = props
  return (
          <div
						className='loginbar'
            style={{
							height: window.screen.height *6.5 / 100 + 'px',
              background: "green"
            }}
          >
            <Menu
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <h1
								className="header"
								onClick={props.handleBackToMain}
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "courier"
                }}
              >
                  MultiLingo
                  <Icon name="language" style={{ marginLeft: "0.1em" }} />
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
          </div>
    );
}

export default LoginBar;
