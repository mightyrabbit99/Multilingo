import * as React from "react";
import Dict, { SearchResult, wordNotFound } from "../../extension/dict";

import { Input } from "semantic-ui-react";

export interface DictionaryProps {
	searching: boolean;
  searchResult: SearchResult;
  searchingWord: (word: string) => void;
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

  dispMeaning() {
		const res = this.props.searchResult;
		(window as any).res = res;
    const wordNotFoundText = "FUCK YOU!!!!!!!!!!";
    const meaningComponent = () => (
      <div className="wordmeaning">
        <h2>{res.word}</h2>
        <h2>{res.phonetic}</h2>
        {Object.keys(res.meaning).map((s: string, i: number) => (
          <div className="expl" key={i}>
            <h3>{s}</h3>
            {res.meaning[s].map((a: any, i: number) => (
              <div className="meaningandexample" key={i}>
                <p>{a.definition}</p>
                {a.synonyms.map((ss: string, i: number) => (
                  <p key={i}>{ss}</p>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
    return (
      <div className="meaning">
        {this.props.searching ? null :
					this.props.searchResult === wordNotFound ? wordNotFoundText : meaningComponent()}
      </div>
    );
  }

  render() {
    const searchBarChange = (e: any) => {
      this.props.searchingWord(e.target.value);
      this.setState({ ...this.state, word: e.target.value, status: DictStatus.Searched });
    };
    return (
      <div className="dictionary">
        <Input
          className="inputbar"
          placeholder="Search..."
          value={this.state.word}
          onChange={searchBarChange}
        />
        {this.state.status === DictStatus.Searched ? this.dispMeaning() : null}
      </div>
    );
  }
}

export default Dictionary;
