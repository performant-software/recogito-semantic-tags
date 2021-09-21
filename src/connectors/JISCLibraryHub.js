const getData = (result, prop) =>
  result.bibliographic_data[prop] ? result.bibliographic_data[prop][0] : null;

const concatData = (result, props) => {
  const fields = props.map(p => getData(result, p))
  return fields.filter(f => f != null).join(', ');
}

export default class JISCLibraryHub {

  constructor(opt_config) {
    this.name = opt_config?.name || 'JISC';
    this.config = opt_config;
  }

  /**
   * Queries the endpoint, returning a Promise of 
   * a list of suggestions
   */
  query(query) {
    return fetch('/jisc/search?format=json&keyword=' + query)
      .then(response => response.json())
      .then(data => 
        data.records ? 
          data.records.map(result => ({
            uri: result.uri,
            label: getData(result, 'title'),
            description: concatData(result, [ 'author', 'publication_details' ])
          })) : []
      )
  }

}

/**
 * Returns true if this source matches the tag (i.e. if 
 * this source is the source of the given tag)s
 */
JISCLibraryHub.matches = tag =>
  tag.uri.match(/^https?:\/\/discover.libraryhub.jisc.ac.uk/g);

/**
 * Renders a screen display form for the given URI
 */
JISCLibraryHub.format = tag =>
  tag.uri.substring(tag.uri.indexOf('id=') + 3, tag.uri.indexOf('&rn='));
