import { parseString } from 'browser-xml2js';

const buildURL = query => {
  return '/SRU?' + [
    'operation=searchRetrieve',
    'startRecord=1',
    'recordSchema=dublincore',
    'version=1.2',
    'maximumRecords=10',
    `query=bib.anywhere+all+"${query}"`
  ].join('&')
}

const getProp = (record, prop) =>
  record[prop] ? record[prop][0] : null;

/**
 * Just an experiment for now...
 */
export default class CatalogueBNF {

  constructor() {
    this.name = 'Catalogue BNF';
  }

  query(query, config) {
    return new Promise((resolve, reject) => {
      fetch(buildURL(query))
        .then(response => response.text())
        .then(xml => {
          parseString(xml, (error, result) => {
            if (error) {
              reject(error);
            } else {
              // SRU. Why?!?
              const records = result['srw:searchRetrieveResponse']['srw:records'][0]['srw:record']
                .map(record => record['srw:recordData'][0]['oai_dc:dc'][0]);

              const mapped = records.map(record => {
                return {
                  uri: getProp(record, 'dc:identifier'),
                  label: getProp(record, 'dc:title'),
                  description: getProp(record, 'dc:description'),
                  type: 'Work'
                }
              });

              resolve(mapped);
            }
          });
        });
    });
  }

  format(tag) {
    return tag.uri.substring(tag.uri.indexOf('entity/Q') + 7);
  }

  matches(tag) {
    return tag.uri.match(/^https?:\/\/www.wikidata.org\/entity\/Q/g)
  }

}