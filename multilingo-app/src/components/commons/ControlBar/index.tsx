import * as React from "react";
import { Icon, Modal, Image, Header, Grid} from "semantic-ui-react";

import FillForm, { FillFormProps } from "../FillForm";

import { CardDeck, Card } from '../../../extension/cards';
import { QuestionGeneratorSettings } from "../../../extension/questions";

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
	modalOpen: boolean;
	handleAddDeck: (deck: CardDeck) => void;
}

export type TestControlBarProps = {
	location: "Test";
	color: string;
	currentDeck: CardDeck;
	currentSettings: QuestionGeneratorSettings;
	saveSettings: (settings: QuestionGeneratorSettings) => void;
	modalOpen: boolean;
}

export type ControlBarProps = MainControlBarProps | CardListControlBarProps | TestControlBarProps;

class ControlBar extends React.Component<ControlBarProps, {modalopen: boolean;}> {
	constructor(props: ControlBarProps) {
		super(props);
		switch(this.props.location) {
			case "Main" : {
				this.state = {
					modalopen: false
				}
				break;
			}
			case "Test" : {
				this.state = {
					modalopen: true
				}
			}
		}
	}
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
				className="controlbar button"
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
				const dispModal = (open: boolean) => this.setState({...this.state, modalopen: open});
				const currentformprop: FillFormProps = {
					type: "Adddeck",
					addNewDeck: (deck: CardDeck) => {
						thisprop.handleAddDeck(deck);
						dispModal(false);
					}
				}
				return (
					<div
						className="buttonarray"
					>
						<Modal trigger={addButton} open={this.state.modalopen} onClose={() => dispModal(false)} onOpen={() => dispModal(true)}>
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
					<Grid className="buttonarray" columns={2}>
						<Grid.Column width={2}>{addButton}</Grid.Column>
						<Grid.Column width={2}>{testButton}</Grid.Column>
					</Grid>
				);
			}
			case "Test" : {
				const thisprop: TestControlBarProps = (this.props as TestControlBarProps);
				const dispModal = (open: boolean) => this.setState({...this.state, modalopen: open});
				const currentformprop: FillFormProps = {
					type: "Testsetting",
					currentDeck: thisprop.currentDeck,
					currentSettings: thisprop.currentSettings,
					saveSettings: (settings: QuestionGeneratorSettings) => {
						thisprop.saveSettings(settings);
						dispModal(false);
					}
				}
				return (
					<div
						className="buttonarray"
					>
						<Modal trigger={addButton} open={this.state.modalopen} onOpen={() => dispModal(true)}>
							<Modal.Header>Test Settings</Modal.Header>
							<Modal.Content image>
								<Image wrapped size="medium" src="https://react.semantic-ui.com/images/avatar/large/rachel.png" />
								<Modal.Description>
									<Header>Test settings</Header>
									<FillForm {...currentformprop}/>
								</Modal.Description>
							</Modal.Content>
						</Modal>
					</div>
				);
			}
		}
  }
}

export default ControlBar;
