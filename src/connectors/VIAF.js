export default class VIAF {

  constructor() {
    this.label = 'VIAF';
  }

  query(query) {

    return fetch('/viaf/AutoSuggest?query=' + query)
      .then(response => response.json())
      .then(data => data.result.map(result => {
        const { viafid, displayForm } = result;
        return { 
          id: `viaf:${viafid}`, 
          label: displayForm,
          uri: `https://viaf.org/viaf/${viafid}`
        }
      }));
  }

}