import BNF from './BNF';
import DPLA from './DPLA';
import JISCLibraryHub from './JISCLibraryHub';
import VIAF from './VIAF';
import Wikidata from './Wikidata';
import WikidataLexeme from './WikidataLexeme';

const BUILTIN_CONNECTORS = {
  'bnf': BNF,
  'dpla': DPLA,
  'jisc': JISCLibraryHub,
  'viaf': VIAF,
  'wikidata': Wikidata,
  'wikidatalexeme': WikidataLexeme
}

export const instantiateSource = nameOrObject => { 

  const instantiate = (source, config) => {
    // Source can be a function or a string
    if (source === 'function' || source instanceof Function) {
      return source(config);
    } else {
      return new BUILTIN_CONNECTORS[source.toLowerCase()](config);
    }
  }

  if (nameOrObject.source) {
    const { source, ...config } = nameOrObject;
    return instantiate(source, config);
  } else {
    // No object with args -> instantiate arg directly
    return instantiate(nameOrObject);
  }
  
}

/** 
 * Finds the source responsible for the URI and formats
 * it, if able
 */
export const format = tag => {
  const source = Object.values(BUILTIN_CONNECTORS).find(s => s.matches(tag));
  return source ? source.format(tag) : tag.uri;
}