import * as React from "react";
import { Rail } from "semantic-ui-react";
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
  };
  return (
    <Rail dividing position="right">
      <div className="propspanel description">
        <p>This is the description of the decks and cards</p>
      </div>
      <ControlBar {...currentControlBarProps} />
    </Rail>
  );
};

export default PropsPanel;
