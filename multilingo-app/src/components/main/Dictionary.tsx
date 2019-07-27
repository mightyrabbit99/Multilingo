import * as React from "react";
import Dict, { SearchResult, wordNotFound } from "../../extension/dict";

import { Input } from "semantic-ui-react";

export interface DictionaryProps {
	searched: boolean;
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
	meaning: SearchResult
};

class Dictionary extends React.Component<DictionaryProps, DictionaryState> {
  constructor(props: DictionaryProps) {
    super(props);
    this.state = {
      status: DictStatus.Main,
			word: "",
			meaning: wordNotFound
		};
		this.dispMeaning = this.dispMeaning.bind(this);
	}

  dispMeaning() {
		const res = this.props.searchResult[0];
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
                {a.synonyms ? a.synonyms.map((ss: string, i: number) => (
                  <p key={i}>{ss}</p>
                )): null}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
    return (
      <div className="meaning">
        {this.props.searched ? 
					(this.props.searchResult === wordNotFound ? wordNotFoundText : meaningComponent()): null}
      </div>
    );
  }

  render() {
		console.log(this.props.searched);
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
