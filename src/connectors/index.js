import VIAF from './VIAF';
import Wikidata from './Wikidata';

const BUILTIN_CONNECTORS = {
  'viaf': new VIAF(),
  'wikidata': new Wikidata()
}

export const getBuiltInSource = name => 
  BUILTIN_CONNECTORS[name.toLowerCase()];

/** 
 * Finds the source responsible for the URI and formats
 * it, if able
 */
export const format = tag => {
  const source = Object.values(BUILTIN_CONNECTORS).find(s => s.matches(tag));
  return source ? source.format(tag) : tag.uri;
}