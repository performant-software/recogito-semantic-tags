/** 
 * Mappings between VIAF and our common
 * icon vocab (place, person, work)
 */
const TYPES = {
  'personal': 'Person',
  'corporate': 'Group',
  'geographic': 'Place',
  'uniformtitlework': 'Work'
}

export default class VIAF {

  constructor(opt_config) {
    this.name = opt_config?.name || 'VIAF';
    this.config = opt_config;
  }

  /**
   * Queries the endpoint, returning a Promise of 
   * a list of suggestions
   */
  query(query) {
    return fetch('/viaf/AutoSuggest?query=' + query)
      .then(response => response.json())
      .then(data => {
        const result = data.result || []; // VIAF returns 'null' for 0 results!
        return result.map(result => {
          const { viafid, displayForm, nametype } = result;
          
          return { 
            uri: `https://viaf.org/viaf/${viafid}`,
            label: displayForm,
            type: TYPES[nametype]
          }
        })
      });
  }

}

/**
 * Returns true if this source matches the tag (i.e. if 
 * this source is the source of the given tag)s
 */
VIAF.matches = tag =>
  tag.uri.match(/^https?:\/\/viaf.org\/viaf/g);

/**
 * Renders a screen display form for the given URI
 */
VIAF.format = tag =>
  'viaf:' + tag.uri.substring(tag.uri.indexOf('/viaf/') + 6);
