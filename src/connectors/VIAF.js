export default class VIAF {

  constructor() {
    this.label = 'VIAF';
  }

  query(query) {
    return new Promise(resolve => {
      resolve([{ label: 'Michael Crichton, 1942-2008'}]);
    });
  }

}