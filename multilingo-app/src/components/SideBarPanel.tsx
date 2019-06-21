import * as React from "react";
import {
  Header,
  Container,
  Icon,
  Menu,
  Sidebar,
  Form,
  Button
} from "semantic-ui-react";

export interface State {
  visible: boolean;
  addDeck: boolean;
}

class SideBarPanel extends React.Component<any, State> {
  state: State = { visible: false, addDeck: true };

  icon() {
    return (
      <Icon
        onClick={this.handleClick}
        style={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          borderRadius: "50%",
          color: "green"
        }}
        name="plus circle"
        size="huge"
        link
      />
    );
  }

  handleButtonClick = () => {};
  handleSidebarHide = () => this.setState({ visible: false });
  handleClick = () => {
    this.setState({ visible: true });
  };

  render() {
    const { visible } = this.state;
    return (
      <Sidebar.Pushable
        style={{ height: "100vh", width: "100vw", marginTop: "-13.5px" }}
      >
        {
          //below is side bar implementation for deck or card
        }
        {this.state.addDeck ? (
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width="wide"
            direction="right"
            style={{ background: "green" }}
          >
            <h3
              style={{
                paddingTop: "9px",
                color: "white"
              }}
            >
              Add a New Deck!
            </h3>
            <Menu.Item as="a">
              <Form>
                <Form.Field>
                  <label
                    style={{
                      textAlign: "left",
                      fontSize: "15px",
                      color: "white"
                    }}
                  >
                    Name of Deck
                  </label>
                  <input placeholder="Name" />
                </Form.Field>
                <Button onClick={this.handleButtonClick}>Ok</Button>
              </Form>
            </Menu.Item>
          </Sidebar>
        ) : (
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width="wide"
            direction="right"
            style={{ background: "green" }}
          >
            <h3
              style={{
                paddingTop: "9px",
                color: "white"
              }}
            >
              Add a New Card!
            </h3>
            <Menu.Item as="a">
              <Form>
                <Form.Field>
                  <label
                    style={{
                      textAlign: "left",
                      fontSize: "15px",
                      color: "white"
                    }}
                  >
                    Word
                  </label>
                  <input placeholder="your word..." />
                </Form.Field>
                <Form.Field>
                  <label
                    style={{
                      textAlign: "left",
                      fontSize: "15px",
                      color: "white"
                    }}
                  >
                    Meaning
                  </label>
                  <input placeholder="meaning..." />
                </Form.Field>
                <Button onClick={this.handleButtonClick}>Done!</Button>
              </Form>
            </Menu.Item>
          </Sidebar>
        )}
        {
          //above is side bar implementation for deck or card
        }

        <Sidebar.Pusher dimmed={visible}>
          <Container>
            <Header as="h3" onClick={() => this.setState({ addDeck: false })}>
              (Goes into the Deck)
            </Header>
            {this.icon()}
          </Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default SideBarPanel;
