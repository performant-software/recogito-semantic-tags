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
    return fetch(`/dpla?q=${query}&api_key=${this.config.apiKey}`)
      .then(response => response.json())
      .then(data => data.docs.map(doc => {
        const uri = doc.isShownAt;
        const label = doc.sourceResource.title[0];
        const description = doc.sourceResource.creator && doc.sourceResource.creator[0];

        return {
          uri, label, description, 
          dpla: true // So we can identify DPLA suggestions
        }
      })
    );
  }

}

/** DPLA provides original URIs - need to think about proper formatting **/
DPLA.matches = tag => tag.dpla;

/** DPLA provides original URIs - need to think about proper formatting **/
DPLA.format = tag => tag.uri.substring(tag.uri.lastIndexOf('/') + 1);
