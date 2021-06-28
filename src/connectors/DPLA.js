export default class DPLA {

  constructor(opt_config) {
    this.name = opt_config?.name || 'DPLA';
    this.config = opt_config;
  }

  /**
   * Queries the endpoint, returning a Promise of 
   * a list of suggestions
   */
  query(query) {
    return fetch(`https://api.dp.la/v2/items?q=${query}&api_key=${this.config.apiKey}`)
      .then(response => response.json())
      .then(data => data.docs.map(doc => {
        const uri = doc.isShownAt;
        const label = doc.sourceResource.title[0];
        const description = doc.sourceResource.creator[0];
        return {
          uri, label, description
        }
      }));
  }

}

/** DPLA provides original URIs - need to think about proper formatting **/
DPLA.matches = tag => false;

/** DPLA provides original URIs - need to think about proper formatting **/
DPLA.format = tag => tag.uri;
