import wd from 'wikidata-sdk';

export default class Wikidata {

  constructor() {
    this.label = 'Wikidata';
  }

  query(query) {
    const url = wd.searchEntities(query);
    return fetch(url)
      .then(response => response.json())
      .then(data => data.search.map(result => {
        const { id, label, description, concepturi } = result;
        return { id, label, description, uri: concepturi };
      }));
  }

}