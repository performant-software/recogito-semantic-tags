export default class VIAF {

  constructor() {
    this.name = 'VIAF';
  }

  /**
   * Queries the endpoint, returning a Promise of 
   * a list of suggestions
   */
  query(query) {
    return fetch('/viaf/AutoSuggest?query=' + query)
      .then(response => response.json())
      .then(data => data.result.map(result => {
        const { viafid, displayForm } = result;
        return { 
          uri: `https://viaf.org/viaf/${viafid}`,
          label: displayForm
        }
      }));
  }

  /**
   * Renders a screen display form for the given URI
   */
  format(tag) {
    return 'viaf:' + tag.uri.substring(tag.uri.indexOf('/viaf/') + 6);
  }

  /**
   * Returns true if this source matches the tag (i.e. if 
   * this source is the source of the given tag)s
   */
  matches(tag) {
    return tag.uri.match(/^https?:\/\/viaf.org\/viaf/g)
  }

}