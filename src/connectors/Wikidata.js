export default class Wikidata {

  constructor() {
    this.label = 'Wikidata';
  }

  query(query) {
    return new Promise(resolve => {
      resolve([{ label: 'Michael Crichton Q172140'}]);
    });
  }

}