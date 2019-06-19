import * as React from "react";
import { Container, Sidebar } from "semantic-ui-react";
import { CardDeck } from "../../extension/cards";
import { Card } from "../../extension/types";
import ControlBar, { ControlBarProps } from "../commons/ControlBar";

export type PropsPanelProps = {
  color: string;
	deck: CardDeck;
	handleShowAddCardPanel: () => void;
  card?: Card;
};

//const PropsPanelLocation = 'Main';

const PropsPanel: React.SFC<PropsPanelProps> = props => {
	const currentControlBarProps: ControlBarProps = {
		location: "Main",
		color: props.color,
		handleShowAddDeckPanel: props.handleShowAddCardPanel
	}
  return (
        <Sidebar
					className="propspanel"
          animation='push'
          direction='right'
          icon="labeled"
          inverted
          vertical
          visible={true}
          width='wide'
        >
          <div className="propspanel description">
            <Container>
              <p>This is the description of the decks and cards</p>
            </Container>
          </div>
          <ControlBar {...currentControlBarProps} />
        </Sidebar>
  );
};

export default PropsPanel;
