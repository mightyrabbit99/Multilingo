import * as React from "react";
import { Icon, Modal, Image, Header} from "semantic-ui-react";

import FillForm, { FillFormProps } from "../FillForm";

import { CardDeck, Card } from '../../../extension/cards';

export type ControlBarLocation = "Main" | "CardList";

export type CardListControlBarProps = {
	location: "CardList";
	color: string;
	card?: Card;
	handleShowAddCardPanel: () => void;
	handleTest: () => void;
}

export type MainControlBarProps = {
	location: "Main";
	color: string;
	handleAddDeck: (deck: CardDeck) => void;
}

export type ControlBarProps = MainControlBarProps | CardListControlBarProps;

class ControlBar extends React.Component<ControlBarProps, {}> {
  render() {
		const handleAddButtonOnClick = () => {
			if(this.props.location === "CardList") {
				this.props.handleShowAddCardPanel();
			}
		}

		const handleTestButtonOnClick = () => {
			if(this.props.location === "CardList") {
				this.props.handleTest();
			}
		}
		const testButton = (
      <Icon
        onClick={handleTestButtonOnClick}
        style={{
					position: "absolute",
					padding: "5px",
          bottom: "5%",
          right: "20%",
          borderRadius: "50%",
          color: "green"
        }}
        name="chess"
        size="huge"
        link
      />
		);
		
    const addButton = (
      <Icon
        onClick={handleAddButtonOnClick}
        style={{
					position: "absolute",
					padding: "5px",
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

		switch(this.props.location) {
			case "Main" : {
				const thisprop: MainControlBarProps = (this.props as MainControlBarProps);
				const currentformprop: FillFormProps = {
					type: "Adddeck",
					addNewDeck: thisprop.handleAddDeck
				}
				return (
					<div
						className="button-array"
						style={{
							position: "fixed",
							margin: "2em",
							bottom: "0px",
							right: "0px",
							animation: "1.5s ease-in-out 0s infinite normal none running back-to-docs",
							zIndex: 6
						}}
					>
						<Modal trigger={addButton}>
							<Modal.Header>Add New Deck</Modal.Header>
							<Modal.Content image>
								<Image wrapped size="medium" src="https://react.semantic-ui.com/images/avatar/large/rachel.png" />
								<Modal.Description>
									<Header>Add a deck</Header>
									<FillForm {...currentformprop}/>
								</Modal.Description>
							</Modal.Content>
						</Modal>
					</div>
				);
			}
			case "CardList" : {
				return (
					<div>
						{addButton}
						{testButton}
					</div>
				);
			}
		}
  }
}

export default ControlBar;
