import wd from 'wikidata-sdk';

export default class Wikidata {

  constructor(opt_config) {
    this.name = opt_config?.name || 'Wikidata';
    this.config = opt_config;
  }

  query(query, globalConfig) {
    const { language, limit } = globalConfig; 

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

}

Wikidata.matches = tag =>
  tag.uri.match(/^https?:\/\/www.wikidata.org\/entity\/Q/g);

Wikidata.format = tag =>
  tag.uri.substring(tag.uri.indexOf('entity/Q') + 7);