import * as React from "react";
import { Icon, Modal, Button, Image, Header, Form } from "semantic-ui-react";

export type ControlBarLocation = "Main" | "CardList";

export type ControlBarProps = {
  location: ControlBarLocation;
  color: string;
  handleShowAddDeckPopUp?: () => void;
  handleShowAddCardPanel?: () => void;
  handleAddDeck?: (name: string) => void;
};

const ControlBar: React.SFC<ControlBarProps> = props => {
  const addDeckButton = (
    /*
    <Button className="addDeck" onClick={props.handleShowAddDeckPopUp}>
      <Icon name="plus circle" size="huge" />
    </Button>
    */
    <Icon
      onClick={props.handleShowAddDeckPopUp}
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

  const handleFormSubmit = (e: any, { name, value }: any) => {
    e.preventDefault();
    if (props.handleAddDeck) props.handleAddDeck(e.target.name.value);
  };

  return (
    <div
      className="button-array"
      style={{
        position: "fixed",
        margin: "2em",
        bottom: "0px",
        right: "0px",
        animation:
          "1.5s ease-in-out 0s infinite normal none running back-to-docs",
        zIndex: 6
      }}
    >
      <Modal trigger={addDeckButton}>
        <Modal.Header>Add New Deck</Modal.Header>
        <Modal.Content image>
          <Image
            wrapped
            size="medium"
            src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
          />
          <Modal.Description>
            <Header>Add a deck</Header>
            <Form className="adddeckform" onSubmit={handleFormSubmit}>
              <Form.Field>
                <label>Deck Name</label>
                <Form.Input placeholder="Deck Name" name="name" />
              </Form.Field>
              <Button type="submit">Add!</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default ControlBar;
