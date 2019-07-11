import * as React from "react";
import { Sticky, Segment } from "semantic-ui-react";
import { CardDeck, Card } from "../../extension/cards";
import ControlBar, { CardListControlBarProps } from "../commons/ControlBar";

export type PropsPanelProps = {
  color: string;
  deck: CardDeck;
  handleShowAddCardPanel: () => void;
  handleTest: () => void;
	card?: Card;
	contextRef: any;
};

//const PropsPanelLocation = 'Main';

const PropsPanel: React.FC<PropsPanelProps> = props => {
  const currentControlBarProps: CardListControlBarProps = {
    location: "CardList",
    color: props.color,
    handleShowAddCardPanel: props.handleShowAddCardPanel,
    handleTest: props.handleTest
	};
  return (
    <div className="propspanel">
      <Sticky className="propspanel description" context={props.contextRef}>
				<Segment>
        <p>This is the description of the decks and cards</p>
				</Segment>
				<ControlBar {...currentControlBarProps} />
      </Sticky>
    </div>
  );
};

export default PropsPanel;
