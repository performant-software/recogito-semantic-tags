import { parseString } from 'browser-xml2js';

const buildURL = (query, limit) => {
  return '/bnf?' + [
    'operation=searchRetrieve',
    'startRecord=1',
    'recordSchema=dublincore',
    'version=1.2',
    `maximumRecords=${limit}`,
    `query=bib.anywhere+all+"${query}"`
  ].join('&')
}

const getProp = (record, prop) =>
  record[prop] ? record[prop][0] : null;

/**
 * Just an experiment for now...
 */
export default class BNF {

  constructor(opt_config) {
    this.name = opt_config?.name || 'BNF';
    this.config = opt_config;
  }

  query(query, config) {
    const limit = config.limit || 20;

    return new Promise((resolve, reject) => {
      fetch(buildURL(query, limit))
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
                  label: JSON.stringify(getProp(record, 'dc:title')),
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

}

BNF.matches = tag =>
  tag.uri.match(/^https?:\/\/www.wikidata.org\/entity\/Q/g);

BNF.format = tag =>
  tag.uri.substring(tag.uri.indexOf('entity/Q') + 7);
