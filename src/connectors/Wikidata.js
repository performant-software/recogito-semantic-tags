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
        const { id, label, description, concepturi } = result;
        return { id, label, description, uri: concepturi };
      }));
  }

}