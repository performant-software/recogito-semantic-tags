import wd from 'wikidata-sdk';

export default class Wikidata {

  constructor() {
    this.label = 'Wikidata';
  }

  query(query, config) {
    const language = config.language; // Defaults to 'en'
    const limit = config.limit; // Defaults to 20

    const url = wd.searchEntities(query, language, limit);
    return fetch(url)
      .then(response => response.json())
      .then(data => data.search.map(result => {
        const { id, label, description, concepturi } = result;
        return { id, label, description, uri: concepturi };
      }));
  }

}