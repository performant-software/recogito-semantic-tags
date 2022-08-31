import wd from 'wikidata-sdk';

export default class WikidataLexeme {


  constructor(opt_config) {
    this.name = opt_config?.name || 'WikidataLexeme';
    this.config = opt_config;
  }

  query(query, globalConfig) {
	if(this.config?.normpattern){
		var target=""
		if(this.config?.targetpattern){
			target=this.config?.targetpattern
		}
		try{
			query=query.replaceAll(this.config?.normpattern,target)
		}catch(error){
			print(error)
		}
	}
    return this.queryFiltered(query, globalConfig)
  }

  queryFiltered(query, globalConfig) {
    const lang = globalConfig.language || 'en';
    const limit = globalConfig.limit || 20;
	
    const sparql = `
      SELECT DISTINCT ?l ?lf ?senseval ?senselabel ?lfgram ?gflabel (GROUP_CONCAT(DISTINCT ?lemmaa; separator=" / ") as ?lemma) WHERE {
		BIND(LCASE("${query}"@${lang}) as ?term)
		{?lang wdt:P218 "${lang}" . } UNION {?lang wdt:P219 "${lang}" . }
        ?l rdf:type ontolex:LexicalEntry ;
           dct:language ?lang ;
		   wikibase:lemma ?lemmaa;
           ontolex:lexicalForm ?lf .
		?lf ontolex:representation ?rep .
        OPTIONAL {?lf wikibase:grammaticalFeature ?lfgram . ?lfgram rdfs:label ?gflabel . FILTER((LANG(?gflabel))= "en")}
        OPTIONAL {?l ontolex:sense ?sense . ?sense wdt:P5137 ?senseval . OPTIONAL { ?senseval rdfs:label ?senselabel . FILTER((LANG(?senselabel))= "en") }}        
		FILTER(str(?rep)=lcase("${query}"))       
      }
	  GROUP BY ?l ?lf ?senseval ?senselabel ?lfgram ?gflabel
	  ORDER BY ?l ?lfgram ?sense ?senselabel 
      LIMIT ${limit}
    `;

    const url = wd.sparqlQuery(sparql);
    return fetch(url)
      .then(response => response.json())
      .then(data => data.results.bindings.map(result => {
        return { 
          uri: result.lf?.value,
		  uri2: (this.config?.wordformmode ? (result.lfgram?.value ?? "") : (result.senseval?.value ?? "")),
		  senseuri: result.senseval?.value ?? "",
		  senselabel: result.senselabel?.value ?? "",
		  sensetaglabel: result.senselabel?.value ? result.senselabel?.value+"("+result.senseval?.value.substring(result.senseval?.value.indexOf('entity/Q') + 7)+")" : "",
		  sensedescription: (result.senselabel?.value ?? "")+" "+("("+result.senseval?.value+")" ?? ""),
		  description2: (this.config?.wordformmode ? (result.gflabel?.value ?? "")+" "+("("+(result.lfgram?.value ?? "")+")" ?? ""): (result.senselabel?.value ?? "")+" "+("("+result.senseval?.value+")" ?? "")),
		  wordformlabel: (result.gflabel?.value ?? ""),
		  wordformuri: (result.lfgram?.value ?? ""),
		  wordformmode: (this.config?.wordformmode ?? false),
          label: (result.lemma?.value ?? ""), 
		  label2: (this.config?.wordformmode ? (result.gflabel?.value ?? "") : (result.senselabel?.value ?? "")),
		  taglabel: result.lemma?.value ? result.lemma?.value+"("+result.lf?.value.substring(result.lf?.value.indexOf('entity/Q') + 7)+")" : result.lf?.value.substring(result.lf?.value.indexOf('entity/Q') + 7),
          description: "Word "+(result.lemma?.value ?? "")+" in "+(result.gflabel?.value ?? "")+" with sense "+(result.senselabel?.value ?? "")
        };
      }));
  }

  doFetch(url) {

  }

}

WikidataLexeme.matches = tag =>
  tag.uri.match(/^https?:\/\/www.wikidata.org\/entity\/L/g);

WikidataLexeme.format = tag =>
  (tag.label?tag.label+"(":"")+tag.uri.substring(tag.uri.indexOf('entity/') + 7)+(tag.label?")":"");