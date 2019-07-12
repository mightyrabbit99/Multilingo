import * as React from "react";

import { Form, Header } from "semantic-ui-react";

import * as CardDef from "../../extension/cards";
import { QuestionGeneratorSettings, defaultGenSettings } from "../../extension/questions";

type SettingsFormProps = {
  type: "Settings";
};

type TestSettingsProps = {
  type: "Testsetting";
  currentDeck: CardDef.CardDeck;
  currentSettings: QuestionGeneratorSettings;
  saveSettings: (settings: QuestionGeneratorSettings) => void;
};

type AddCardFormProps = {
  type: "Addcard";
  currentDeck: CardDef.CardDeck;
  submitCardToDeck: (card: CardDef.Card) => void;
};

type ChangeCardProps = {
  type: "Changecard";
  currentCard: CardDef.Card;
  currentDeck: CardDef.CardDeck;
  amendCurrentCard: (newCard: CardDef.Card) => void;
};

type AddDeckFormProps = {
  type: "Adddeck";
  addNewDeck: (deck: CardDef.CardDeck) => void;
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
  currentSettings: QuestionGeneratorSettings;
};

class FillForm extends React.Component<FillFormProps, FillFormState> {
  constructor(props: FillFormProps) {
    super(props);
    switch (this.props.type) {
      case "Addcard": {
        this.state = {
          currentCard: CardDef.createCard("", "", ""),
          currentDeck: (this.props as AddCardFormProps).currentDeck,
          currentSettings: defaultGenSettings
        };
        break;
      }
      case "Changecard": {
        this.state = {
          currentCard: (this.props as ChangeCardProps).currentCard.copyCard(),
          currentDeck: (this.props as ChangeCardProps).currentDeck,
          currentSettings: defaultGenSettings
        };
        break;
      }
      case "Adddeck": {
        this.state = {
          currentCard: CardDef.defaultCard,
          currentDeck: CardDef.createDeck("", ""),
          currentSettings: defaultGenSettings
        };
        break;
      }
      case "Testsetting": {
        this.state = {
          currentCard: CardDef.defaultCard,
          currentDeck: (this.props as TestSettingsProps).currentDeck,
          currentSettings: defaultGenSettings
        };
        break;
      }
    }
    this.cardform = this.cardform.bind(this);
    this.deckform = this.deckform.bind(this);
    this.testsettingsform = this.testsettingsform.bind(this);
  }

  private testsettingsform(onSubmit: (settings: QuestionGeneratorSettings) => void) {
    let { currentSettings } = this.state;
    let setSettingsProp = (prop: string, field: string, newVal: any) =>
      this.setState(state => {
        state.currentSettings[prop][field] = newVal;
        return state;
      });
    let onChangeGenerator = (typeOfQues: string, field: string) => (e: any) =>
      setSettingsProp(typeOfQues, field, e.target.value);
    return (
      <Form onSubmit={() => onSubmit(currentSettings)}>
        {Object.keys(currentSettings).map((type: string, key: number) => (
          <div key={key}>
            <Header>{type}</Header>
            {Object.keys(currentSettings[type]).map((field: string, key: number) => (
              <Form.Field key={key}>
                <label>{field}</label>
                <input
                  name={field}
                  value={currentSettings[type][field]}
                  onChange={onChangeGenerator(type, field)}
                />
              </Form.Field>
            ))}
          </div>
        ))}
        <Form.Button content="submit" />
      </Form>
    );
  }

  private cardform(onSubmit: () => void) {
    let { currentCard } = this.state;
    let exampleCard = CardDef.exampleExplCard1;
    let setCardProp = (prop: string, newVal: any) => {
      this.setState(state => {
        state.currentCard[prop] = newVal;
        return state;
      });
    };
    let textOnChangeGenerator = (field: string) => (e: any) => setCardProp(field, e.currentTarget.value);
    return (
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>Category</label>
          <input
            placeholder={"Category e.g. " + exampleCard.category}
            name="category"
            value={currentCard.category}
            onChange={textOnChangeGenerator("category")}
          />
        </Form.Field>
        <Form.Field>
          <label>Front</label>
          <input
            placeholder={"Front e.g. " + exampleCard.front}
            name="front"
            value={currentCard.front}
            onChange={textOnChangeGenerator("front")}
          />
        </Form.Field>
        <Form.Field>
          <label>Back</label>
          <input
            placeholder={"Back e.g. " + exampleCard.back}
            name="back"
            value={currentCard.back}
            onChange={textOnChangeGenerator("back")}
          />
        </Form.Field>
        <Form.Group inline>
          <label>Type</label>
          <Form.Radio
            label="Explanation"
            name="Explanation"
            value={CardDef.CardType.Expl}
            checked={currentCard.type === CardDef.CardType.Expl}
            onChange={(e: any) => setCardProp("type", CardDef.CardType.Expl)}
          />
          <Form.Radio
            label="Example"
            name="Example"
            value={CardDef.CardType.Expl}
            checked={currentCard.type === "Example"}
            onChange={(e: any) => setCardProp("type", "Example")}
          />
        </Form.Group>
        <Form.Field>
          <label>Description</label>
          <input
            placeholder="Description"
            name="description"
            value={currentCard.description}
            onChange={textOnChangeGenerator("description")}
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
      currentDeck.info[prop] = newVal;
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
    switch (this.props.type) {
      case "Addcard": {
        const thisprop = this.props as AddCardFormProps;
        return this.cardform(() => {
          if (!this.state.currentCard.isEmpty()) {
            thisprop.submitCardToDeck(this.state.currentCard);
            this.setState({ ...this.state, currentCard: CardDef.createCard("", "", "") });
          }
        });
      }
      case "Changecard": {
        const thisprop = this.props as ChangeCardProps;
        return this.cardform(() => thisprop.amendCurrentCard(this.state.currentCard));
      }
      case "Adddeck": {
        const thisprop = this.props as AddDeckFormProps;
        return this.deckform(() => {
          if (!this.state.currentDeck.isEmpty()) {
            thisprop.addNewDeck(this.state.currentDeck);
            this.setState({ ...this.state, currentDeck: CardDef.createDeck("", "") });
          }
        });
      }
      case "Settings": {
        return <div className="SettingsForm" />;
      }
      case "Testsetting": {
        return this.testsettingsform(this.props.saveSettings);
      }
    }
  }
}

export default FillForm;
