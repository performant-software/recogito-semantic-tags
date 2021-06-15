export default class VIAF {

  constructor() {
    this.label = 'VIAF';
  }

  query(query) {
    return fetch('http://localhost:5000?query=' + query)
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