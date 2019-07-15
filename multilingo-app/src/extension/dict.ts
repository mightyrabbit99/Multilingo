import request from "request-promise-native";
import cheerio from "cheerio";
import { Card, createCard, CardType } from "./cards";

type SearchResult = any;

class Dictionary {
  constructor(url: string) {
    this.dicturl = url;
		this.search = this.search.bind(this);
		this.generateCards = this.generateCards.bind(this);
  }

	dicturl: string = "";
	
	generateCards(word: string): Card[] {
		let res = this.search(word);
		let ans: any = [];
		if(res) {
			res[0].meaning.forEach((elem: any, i: number) => {
				if(elem.definition) {
					ans.push(createCard("dictionary autocreate", elem.definition, word, CardType.Expl))
				}
				if(elem.synonyms) {
					let syn: string = elem.synonyms.shift();
					elem.synonyms.forEach((word: string) => {syn += ", " + word;});
					ans.push(createCard("dictionary autocreate", syn, word, CardType.Expl))
				}
			})
		} 
		return ans;
	}

  search(word: string): SearchResult {
		let wordd = word;
    let dict;
    let url = encodeURI(this.dicturl + word);
    request(
      {
        method: "GET",
        url: url,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0"
        }
      }).then(
      body => {
				var $ = cheerio.load(body);

        if (!$(".hwg .hw").first()[0]) {
          console.log(
            $(".searchHeading")
              .first()
              .text()
          );
          console.log(wordd + " is not present in Dictionary.");
          return null;
        }

        var dictionary: any = [];

        var i,
          j = 0;

        var entryHead = $(".entryHead.primary_homograph");

        var array = [];
        var entriesOfFirstEntryHead = $("#" + entryHead[0].attribs.id + " ~ .gramb").length;
        console.log(entriesOfFirstEntryHead);
        for (i = 0; i < entryHead.length; i++) {
          array[i] = entriesOfFirstEntryHead - $("#" + entryHead[i].attribs.id + " ~ .gramb").length;
        }
        array[i] = entriesOfFirstEntryHead;
        console.log(array);

        var grambs = $("section.gramb");

        var numberOfentryGroup = array.length - 1;

        for (i = 0; i < numberOfentryGroup; i++) {
          var entry: any = {};

          var word = $(".hwg .hw")[i].childNodes[0].nodeValue;
          entry.word = word;
          console.log(entry.word);

          var phonetic = $(".pronSection.etym .pron .phoneticspelling")[i];
          if (phonetic) {
            entry.phonetic = phonetic.childNodes[0].data;
          }

          entry.meaning = {};

          //var numberOfGrambs = array[i + 1] - array[i];
          var start = array[i];
          var end = array[i + 1];

          for (j = start; j < end; j++) {
            var partofspeech = $(grambs[j])
              .find(".ps.pos .pos")
              .text();
            $(grambs[j])
              .find(".semb")
              .each(function(j, element: any) {
                var meaningArray: any = [];
                $(element)
                  .find("> li")
                  .each(function(j, element: any) {
                    var item = $(element).find("> .trg");

                    var definition = $(item)
                      .find(" > p > .ind")
                      .text();
                    if (definition.length === 0) {
                      definition = $(item)
                        .find(".crossReference")
                        .first()
                        .text();
                    }
                    var example = $(item)
                      .find(" > .exg  > .ex > em")
                      .first()
                      .text();
                    var synonymsText = $(item)
                      .find(" > .synonyms > .exg > div > .syn")
                      .text();
                    var synonyms = synonymsText
                      .split(/,|;/)
                      .filter((synonym: any) => synonym != " " && synonym)
                      .map(function(item: any) {
                        return item.trim();
                      });

                    var newDefinition: any = {};
                    if (definition.length > 0) newDefinition.definition = definition;

                    if (example.length > 0) newDefinition.example = example.substring(1, example.length - 1);

                    if (synonyms.length > 0) newDefinition.synonyms = synonyms;

                    meaningArray.push(newDefinition);
                  });

                if (partofspeech.length === 0) partofspeech = "crossReference";

                entry.meaning[partofspeech] = meaningArray.slice();
              });
          }
          dictionary.push(entry);
        }

        Object.keys(dictionary).forEach(key => {
          Array.isArray(dictionary[key]) && !dictionary[key].length && delete dictionary[key];
        });

        dict = dictionary;
      }).catch(function (err: any) {console.log(err)});

    return dict;
  }
}

export default Dictionary;