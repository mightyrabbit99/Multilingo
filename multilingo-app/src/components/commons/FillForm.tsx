import * as React from "react";

import { Form } from "semantic-ui-react";

import * as CardDef from "../../extension/cards";

export type FormType = "Adddeck" | "Addcard" | "Changecard" | "Settings" | "TestSetting";

type SettingsFormProps = {};

type TestSettingsProps = {};

type AddCardFormProps = {
  currentDeck: CardDef.CardDeck;
  submitCardToDeck: (card: CardDef.Card) => void;
};

type ChangeCardProps = {
  currentCard: CardDef.Card;
  amendCurrentCard: (newCard: CardDef.Card) => void;
};

type AddDeckFormProps = {
  addNewDeck?: (deck: CardDef.CardDeck) => void;
};

export type FillFormProps =
  | AddCardFormProps
  | AddDeckFormProps
  | ChangeCardProps
  | SettingsFormProps
  | TestSettingsProps;

type FillFormState = {
  currentDeck: CardDef.CardDeck;
  currentCard: CardDef.Card;
};

class FillForm extends React.Component<FillFormProps, FillFormState> {
  private cardform(onSubmit: () => void) {
    let { currentCard } = this.state;
    let exampleCard = CardDef.exampleExplCard1;
    let setCardProp = (prop: string, newVal: any) => {
      this.state.currentCard[prop] = newVal;
      this.setState(this.state);
    };
    let onChangeGenerator = (field: string) => (e: any) => setCardProp(field, e.target.value);
    return (
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>Category</label>
          <input
            placeholder={"Category e.g. " + exampleCard.category}
            name="category"
            value={currentCard.category}
            onChange={onChangeGenerator("category")}
          />
        </Form.Field>
        <Form.Field>
          <label>Front</label>
          <input
            placeholder={"Front e.g. " + exampleCard.front}
            name="front"
            value={currentCard.front}
            onChange={onChangeGenerator("front")}
          />
        </Form.Field>
        <Form.Field>
          <label>Back</label>
          <input
            placeholder={"Back e.g. " + exampleCard.back}
            name="back"
            value={currentCard.back}
            onChange={onChangeGenerator("back")}
          />
        </Form.Field>
        <Form.Group inline>
          <label>Type</label>
          <Form.Radio
            label="Explanation"
            value={CardDef.CardType.Explanation}
            checked={currentCard.type === CardDef.CardType.Explanation}
            onChange={onChangeGenerator("type")}
          />
          <Form.Radio
            label="Example"
            value={CardDef.CardType.Example}
            checked={currentCard.type === CardDef.CardType.Example}
            onChange={onChangeGenerator("type")}
          />
        </Form.Group>
        <Form.Field>
          <label>Description</label>
          <input
            placeholder="Description"
            name="description"
            value={name}
            onChange={onChangeGenerator("description")}
          />
        </Form.Field>
        <Form.Button content="Submit" />
      </Form>
    );
  }

  private deckform(onSubmit: () => void) {
    let { currentDeck } = this.state;
    let exampleDeck = CardDef.exampleDeck;
    let setDeckProp = (prop: string, newVal: any) => {
      this.state.currentDeck.info[prop] = newVal;
      this.setState(this.state);
    };
    let onChangeGenerator = (field: string) => (e: any) => setDeckProp(field, e.target.value);
    return (
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>Category</label>
          <input
            placeholder={"Category e.g. " + exampleDeck.info.category}
            name="category"
            value={currentDeck.info.category}
            onChange={onChangeGenerator("category")}
          />
        </Form.Field>
        <Form.Field>
          <label>Name</label>
          <input
            placeholder={"Name e.g. " + exampleDeck.info.name}
            name="name"
            value={currentDeck.info.name}
            onChange={onChangeGenerator("name")}
          />
        </Form.Field>
        <Form.Button content="Submit" />
      </Form>
    );
  }

  render() {
    switch(typeof this.props) {
      case "Addcard": {
        this.state = {
          currentCard: CardDef.createCard("", "", ""),
          currentDeck: this.props.currentDeck
        };
        return this.cardform(() => this.props.submitCardToDeck(this.state.currentCard));
      }
      case "Changecard": {
        this.state = {
          currentCard: this.props.currentCard.copyCard(),
          currentDeck: this.props.currentDeck
        };
        return this.cardform(() => this.props.amendCurrentCard(this.state.currentCard));
      }
      case "Adddeck": {
        this.state = {
          currentCard: null,
          currentDeck: CardDef.createDeck("", "")
        };
        return this.deckform(() => this.props.addNewDeck(this.state.currentDeck));
      }
      case "Settings": {
        return <div className="SettingsForm" />;
      }
      case "TestSetting": {
        return <div className="TestSettingsForm" />;
      }
    }
  }
}

export default FillForm;
