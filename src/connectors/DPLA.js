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
        /*
        const result = data.result || []; // VIAF returns 'null' for 0 results!
        return result.map(result => {
          const { viafid, displayForm, nametype } = result;
          
          return { 
            uri: `https://viaf.org/viaf/${viafid}`,
            label: displayForm,
            type: TYPES[nametype]
          }
        })
        */
      }));
  }

}

/**
 * Returns true if this source matches the tag (i.e. if 
 * this source is the source of the given tag)s
 */
DPLA.matches = tag =>
  tag.uri.match(/^https?:\/\/viaf.org\/viaf/g);

/**
 * Renders a screen display form for the given URI
 */
DPLA.format = tag =>
  'viaf:' + tag.uri.substring(tag.uri.indexOf('/viaf/') + 6);
