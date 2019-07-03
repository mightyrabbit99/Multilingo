import * as React from "react";
import { Container, Sidebar } from "semantic-ui-react";
import { CardDeck, Card } from "../../extension/cards";
import ControlBar, { CardListControlBarProps } from "../commons/ControlBar";

export type PropsPanelProps = {
  color: string;
	deck: CardDeck;
	handleShowAddCardPanel: () => void;
	handleTest: () => void;
  card?: Card;
};

//const PropsPanelLocation = 'Main';

const PropsPanel: React.FC<PropsPanelProps> = props => {
	const currentControlBarProps: CardListControlBarProps = {
		location: "CardList",
		color: props.color,
		handleShowAddCardPanel: props.handleShowAddCardPanel,
		handleTest: props.handleTest
	}
  return (
        <Sidebar
					className="propspanel"
          animation='push'
          direction='right'
          icon="labeled"
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
