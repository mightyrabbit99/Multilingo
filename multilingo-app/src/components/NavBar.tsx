import * as React from "react";
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility
} from "semantic-ui-react";

class NavBar extends React.Component<any> {
  state = {
    name: ["Home", "MyDecks", "Play", "Profile"],
    activeIndex: 0,
    fixed: false
  };

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ padding: "1em 0em" }}
            vertical
          >
            <Menu
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                {this.state.name.map((name, id) => {
                  const active =
                    this.state.activeIndex == this.state.name.indexOf(name)
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
                })}

                <Menu.Item position="right">
                  <Button as="a" inverted={!fixed}>
                    Log in
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
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

export default NavBar;
