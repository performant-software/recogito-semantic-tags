import wd from 'wikidata-sdk';

export default class Wikidata {

  constructor(opt_config) {
    this.name = opt_config?.name || 'Wikidata';
    this.config = opt_config;
  }

  query(query, globalConfig) {
    return this.config?.filter ?
      this.queryFiltered(query, globalConfig) :
      this.queryAll(query, globalConfig);
  }

  queryAll(query, globalConfig) {
    const lang = globalConfig.language || 'en';
    const limit = globalConfig.limit || 20;

    const url = wd.searchEntities(query, lang, limit);
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

  queryFiltered(query, globalConfig) {
    const lang = globalConfig.language || 'en';
    const limit = globalConfig.limit || 20;
    
    const sparql = `
      SELECT ?item ?itemLabel ?description WHERE {
        VALUES ?plabel { "${query}" }
        
        SERVICE wikibase:mwapi {
          bd:serviceParam wikibase:api "EntitySearch" .
          bd:serviceParam wikibase:endpoint "www.wikidata.org" .
          bd:serviceParam mwapi:search ?plabel .
          bd:serviceParam mwapi:language "${lang}" .
          ?item wikibase:apiOutputItem mwapi:item .
        }
        
        ?item wdt:P31 wd:${this.config.filter} .
        ?item schema:description ?description .
          
        SERVICE wikibase:label { 
          bd:serviceParam wikibase:language "${lang}".
        }
        
        FILTER(LANG(?description) = "${lang}") .
      } LIMIT ${limit}
    `;

    const url = wd.sparqlQuery(sparql);
    return fetch(url)
      .then(response => response.json())
      .then(data => data.results.bindings.map(result => {
        return { 
          uri: result.item.value,
          label: result.itemLabel.value, 
          description: result.description.value
        };
      }));
  }

  doFetch(url) {

  }

}

Wikidata.matches = tag =>
  tag.uri.match(/^https?:\/\/www.wikidata.org\/entity\/Q/g);

Wikidata.format = tag =>
  tag.uri.substring(tag.uri.indexOf('entity/Q') + 7);
