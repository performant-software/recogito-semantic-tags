import wd from 'wikidata-sdk';

export default class WikidataLexeme {


  constructor(opt_config) {
    this.name = opt_config?.name || 'WikidataLexeme';
    this.config = opt_config;
	this.formattingtags=["sup","sub","b","i"]
  }
  
  getHTMLSelection(){
	let selection=window.parent.document.getElementsByClassName("r6o-selection")
	let result=""
	for(let i=0;i<selection.length;i++){
		if(this.formattingtags.includes(selection[i].parentNode.nodeName.toLowerCase())){
			result+="<"+selection[i].parentNode.nodeName.toLowerCase()+">"+selection[i].textContent+"</"+selection[i].parentNode.nodeName.toLowerCase()+">"
		}else{
			result+=selection[i].textContent
		}
	}
	return result
  }
  
  getTextSelection(){
	let selection=window.parent.document.getElementsByClassName("r6o-selection")
	let result=""
	for(let i=0;i<selection.length;i++){
		result+=selection[i].textContent
	}
	return result
  }

  query(query, globalConfig) {
	if(this.config?.matchHTML && query==this.getTextSelection()){	
		query=this.getHTMLSelection()
	}
	if(this.config?.normpattern){
		if(typeof this.config?.normpattern === 'function'){
			console.log(this.config?.normpattern)
			try{
				query=this.config?.normpattern(query)
			}catch(error){
				console.log(error)
			}			
		}else if(typeof this.config?.normpattern === 'object' && Array.isArray(this.config?.normpattern)){
			for(let item in this.config?.normpattern){
				if("from" in this.config?.normpattern[item] && "to" in this.config?.normpattern[item]){
					console.log(this.config?.normpattern[item]["from"]+" - "+this.config?.normpattern[item]["to"])
					try{
						query=query.replaceAll(this.config?.normpattern[item]["from"],this.config?.normpattern[item]["to"])
					}catch(error){
						console.log(error)
					}	
				}
				console.log(query)
			}
		}else{
			var target=""
			if(this.config?.targetpattern){
				target=this.config?.targetpattern
			}
			try{
				query=query.replaceAll(this.config?.normpattern,target)
			}catch(error){
				console.log(error)
			}		
		}
	}
	console.log(query)
    return this.queryFiltered(query, globalConfig)
  }

  queryFiltered(query, globalConfig) {
    const lang = globalConfig.language || 'en';
    const limit = globalConfig.limit || 20;
	if(this.config?.wordformmode){
	    var sparql = `
      SELECT DISTINCT ?l ?lf ?senseval ?senselabel ?lfgram ?gflabel (GROUP_CONCAT(DISTINCT ?lemmaa; separator=" / ") as ?lemma) WHERE {
		BIND(LCASE("${query}"@${lang}) as ?term)
		{?lang wdt:P218 "${lang}" . } UNION {?lang wdt:P219 "${lang}" . }
        ?l rdf:type ontolex:LexicalEntry ;
           dct:language ?lang ;
		   wikibase:lemma ?lemmaa;
           ontolex:lexicalForm ?lf .
		?lf ontolex:representation ?rep .
        ?lf wikibase:grammaticalFeature ?lfgram . ?lfgram rdfs:label ?gflabel . FILTER((LANG(?gflabel))= "en")
        OPTIONAL {?l ontolex:sense ?sense . ?sense wdt:P5137 ?senseval . OPTIONAL { ?senseval rdfs:label ?senselabel . FILTER((LANG(?senselabel))= "en") }}        
		FILTER(str(?rep)=lcase("${query}"))       
      }
	  GROUP BY ?l ?lf ?senseval ?senselabel ?lfgram ?gflabel
	  ORDER BY ?l ?lfgram ?sense ?senselabel 
      LIMIT ${limit}
    `;
	}else{
	    var sparql = `
      SELECT DISTINCT ?l ?lf ?senseval ?senselabel ?lfgram ?gflabel (GROUP_CONCAT(DISTINCT ?lemmaa; separator=" / ") as ?lemma) WHERE {
		BIND(LCASE("${query}"@${lang}) as ?term)
		{?lang wdt:P218 "${lang}" . } UNION {?lang wdt:P219 "${lang}" . }
        ?l rdf:type ontolex:LexicalEntry ;
           dct:language ?lang ;
		   wikibase:lemma ?lemmaa;
           ontolex:lexicalForm ?lf .
		?lf ontolex:representation ?rep .
        OPTIONAL {?lf wikibase:grammaticalFeature ?lfgram . ?lfgram rdfs:label ?gflabel . FILTER((LANG(?gflabel))= "en")}
        ?l ontolex:sense ?sense . ?sense wdt:P5137 ?senseval . OPTIONAL { ?senseval rdfs:label ?senselabel . FILTER((LANG(?senselabel))= "en") }        
		FILTER(str(?rep)=lcase("${query}"))       
      }
	  GROUP BY ?l ?lf ?senseval ?senselabel ?lfgram ?gflabel
	  ORDER BY ?l ?lfgram ?sense ?senselabel 
      LIMIT ${limit}
    `;
	}
	
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
          description: "Word "+(result.lemma?.value ?? "")+(result.gflabel?.value ? " in "+result.gflabel?.value : "")+" with sense "+(result.senselabel?.value ?? "")
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
