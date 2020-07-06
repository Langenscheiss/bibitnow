var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix title, journal title, date, abstract
		metaData["citation_download"] = metaData["citation_download"].replace(/JO[\t\ ]+[\--]+[\t\ ]+/,"JF - ").replace(/TI[\t\ ]+[\--]+[\t\ ]+/,"T1 - ").replace(/DA[\t\ ]+[\-]+[\t\ ]+/,"Y1 - ").replace(/AB[\t\ ]+[\-]+[\t\ ]+/,"N2 - ").trim();
		
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
				
		//fix math in static title
		metaData["citation_title"] = metaData["citation_title"].replace(/\$\$[\s]*[^\$]+?[\s]*\$\$/g,"").replace(/[\ ]+/g," ");
		
		//fix math in abstract, math symbols saved in citation_misc
		let abstract = metaData["citation_abstract"].replace(/^[\s]*abstract[\:\s]*/i,"");
		let mathSymbols = metaData["citation_misc"];
		if (abstract != "" && mathSymbols != "" && (mathSymbols = mathSymbols.split(/[\ ]+;[\ ]+/)) != null) {
			const length = mathSymbols.length;
			if (length%3 == 0) {
				
				//index variable
				let idx = 0;
				for (let i = 0; i<length; ++i) {
				
					//get match and math symbol from misc
					let match = mathSymbols[i].trim();
					i++;
					match += mathSymbols[i].trim();
					i++
					
					let symbol = mathSymbols[i].trim();
					let matchAlt = match + " " + symbol + " ";
					match += "" + symbol + "";
					
					//continue only if not empty string
					if (symbol != "") {
						
						//search for match in abstract text
						let nextIdx = abstract.indexOf(match,idx);
						if (nextIdx == -1) {
							match = matchAlt;
							nextIdx = abstract.indexOf(match,idx);
						}
						
						//if found, replace by math
						if (nextIdx != -1) {
							
							//get index in OLD abstract after match
							idx = nextIdx + match.length;
							
							//replace string in abstract
							abstract = abstract.slice(0,nextIdx) + "$" + symbol + "$" + abstract.slice(idx);
							
							//get index in NEW abstract where to start searching from!
							idx = nextIdx + symbol.length+3;
						}
					}
				}
			}
		}
		
		//fix abstract, prefer static, and fix math in downloaded title
		metaData["citation_abstract"] = abstract;
		if ((metaData = metaData["citation_download"]) != null && typeof(metaData) == 'object') {
			if (abstract != "") metaData["citation_abstract"] = "";
			metaData["citation_title"] = metaData["citation_title"].replace(/\$\$[\s]*[^\$]+?[\s]*\$\$/g,"").replace(/[\ ]+/g," ");
		}
		
		//set database
		metaData["citation_database"] = "Springer Link";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
