export default class FactGrid {

  // Configuration parameters provided 
  // to the widget during initialization
  constructor(widgetConfig) {
    this.name = widgetConfig?.name || 'FactGrid'
  }

  // Query string + global widget configuration (language, etc.)
  query(query, globalConfig) {
    const lang = globalConfig.language || 'en';
    const limit = globalConfig.limit || 20;
	if(this.config?.filter){
		const sparql = `
		  PREFIX wdt: <http://www.wikidata.org/prop/direct/>
		  PREFIX wd: <http://www.wikidata.org/entity/>
		  PREFIX schema: <https://schema.org/>
		  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		  SELECT DISTINCT ?uri ?label ?description WHERE {
			?uri wdt:P2 wd:${this.config.filter} ;
			rdfs:label "${query}"@${lang} .
			?uri rdfs:label ?label .
			OPTIONAL { ?uri schema:description ?description . }
			FILTER(lang(?label)='${lang}')
		  } LIMIT ${limit}
		`;	
	return fetch(`https://database.factgrid.de/sparql?format=json&query=`+encodeURIComponent(`${sparql}`))
      .then(response => response.json())
      .then(data => data.results.bindings.map(result => {
		console.log(result)
        // Extract relevant fields and return a Tag object
        var { uri, label, description } = result;
		console.log(uri)
		console.log(label)
		if(typeof(description)==='undefined'){
			description={"value":""}
		}
		console.log(description)
        return { "uri":result.uri?.value ?? "", "label":result.label?.value ?? "", "description":result.description?.value ?? "" };
      }));
	}else{
		const sparql = `
		  PREFIX wdt: <http://www.wikidata.org/prop/direct/>
		  PREFIX wd: <http://www.wikidata.org/entity/>
		  PREFIX schema: <https://schema.org/>
		  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
		  SELECT DISTINCT?uri ?label ?desc WHERE {
			?uri rdfs:label "${query}"@${lang} .
			?uri rdfs:label ?label .
			OPTIONAL { ?uri schema:description ?desc . }
			FILTER(lang(?label)='${lang}')
		  } LIMIT ${limit}
		`;
	return fetch(`https://database.factgrid.de/sparql?format=json&query=`+encodeURIComponent(`${sparql}`))
      .then(response => response.json())
      .then(data => data.results.bindings.map(result => {
		console.log(result)
        // Extract relevant fields and return a Tag object
        var { uri, label, description } = result;
		console.log(uri)
		console.log(label)
		if(typeof(description)==='undefined'){
			description={"value":""}
		}
		console.log(description)
        return { "uri":result.uri?.value ?? "", "label":result.label?.value ?? "", "description":result.description?.value ?? "" };
      }));		
	}

  }

}

FactGrid.matches = tag =>
  tag.uri.match(/^https?:\/\/database.factgrid.de\/entity\/Q/g);

FactGrid.format = tag =>
  (tag.label?tag.label+"(":"")+tag.uri.substring(tag.uri.indexOf('entity/') + 7)+(tag.label?")":"")+"\n"+tag.description;
