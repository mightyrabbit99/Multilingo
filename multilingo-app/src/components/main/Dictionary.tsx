import * as React from "react";
import Dict from "../../extension/dict";

import { Input } from "semantic-ui-react";

export interface DictionaryProps {
  dict: Dict;
}

enum DictStatus {
  Main = "Main",
  Searched = "Searched"
}

type DictionaryState = {
  status: DictStatus;
  word: string;
};

class Dictionary extends React.Component<DictionaryProps, DictionaryState> {
  constructor(props: DictionaryProps) {
    super(props);
    this.state = {
      status: DictStatus.Main,
      word: ""
    };
  }
  render() {
    const searchBarChange = (e: any) =>
      this.setState({ ...this.state, word: e.target.value, status: DictStatus.Searched });
    return (
      <div className="dictionary">
        <Input
          className="inputbar"
          placeholder="Search..."
          value={this.state.word}
					onChange={searchBarChange}
        />
      </div>
    );
  }
}

export default Dictionary;
