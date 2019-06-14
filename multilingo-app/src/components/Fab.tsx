import * as React from "react";
import {
  Button,
  Header,
  Container,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar
} from "semantic-ui-react";

export interface State {
  visible: boolean;
}

class Fab extends React.Component<any, State> {
  state: State = { visible: false };

  icon() {
    return (
      <Icon
        onClick={this.handleClick}
        style={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          borderRadius: "50%"
        }}
        name="plus circle"
        size="huge"
        link
      />
    );
  }

  sideBar() {
    return;
  }
  handleSidebarHide = () => this.setState({ visible: false });
  handleClick = () => {
    this.setState({ visible: true });
  };

  render() {
    const { visible } = this.state;
    return (
      <Sidebar.Pushable style={{ height: "100vh" }}>
        <Sidebar
          as={Menu}
          animation="overlay"
          icon="labeled"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={visible}
          width="thin"
          direction="right"
        >
          <Menu.Item as="a">
            <Icon name="add square" />
            Add Deck
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={visible}>
          <Container style={{ margin: "10px" }}>
            <Header as="h3">Application Content</Header>
            {this.icon()}
          </Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export default Fab;
