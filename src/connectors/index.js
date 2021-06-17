import VIAF from './VIAF';
import Wikidata from './Wikidata';

const BUILTIN_CONNECTORS = {
  'viaf': VIAF,
  'wikidata': Wikidata
}

export const getBuiltInSource = name => 
  new BUILTIN_CONNECTORS[name.toLowerCase()]();