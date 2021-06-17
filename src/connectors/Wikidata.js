import wd from 'wikidata-sdk';

export default class Wikidata {

  constructor() {
    this.name = 'Wikidata';
  }

  query(query, config) {
    const { language, limit } = config; 

    const url = wd.searchEntities(query, language, limit);

    return fetch(url)
      .then(response => response.json())
      .then(data => data.search.map(result => {
        const { label, description, concepturi } = result;
        return { 
          uri: concepturi,
          label, 
          description
        };
      }));
  }

  format(tag) {
    return tag.uri.substring(tag.uri.indexOf('entity/Q') + 7);    
  }

  matches(tag) {
    return tag.uri.match(/^https?:\/\/www.wikidata.org\/entity\/Q/g)
  }

}