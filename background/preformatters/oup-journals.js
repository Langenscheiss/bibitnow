var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatRawData(metaData, parser) {
		//fix doi
		metaData["citation_download"] = metaData["citation_download"].replace(/N1[\t\ ]+[\-]+[\t\ ]+/,"DO - ").replace(/T1[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").trim();
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		let mathSymbols = metaData["citation_misc"];
		
		//prefer static abstract if available
		let abstract = metaData["citation_abstract"];
		if (abstract != "") {
			let download = metaData["citation_download"];
			if (download != null && typeof(download) == 'object') {
				download["citation_abstract"] = "";
			}
			
			//fix math in abstract, math symbols saved in citation_misc
			let mathSymbols = metaData["citation_misc"];
			if (mathSymbols != "" && (mathSymbols = mathSymbols.split(/[\ ]+;[\ ]+/)) != null) {
				const length = mathSymbols.length;
				if (length%2 == 0) {
					//index variable
					let idx = 0;
					for (let i = 0; i<length; ++i) {
					
						//get match and math symbol from misc
						let match = mathSymbols[i].trim();
						i++;
						let symbol = mathSymbols[i].trim();
						match += symbol;
						
						//continue only if not empty string
						if (symbol != "") {
							
							//search for match in abstract text
							let nextIdx = abstract.indexOf(match,idx);
							
							//if found, replace by math
							if (nextIdx != -1) {
								
								//get new index in abstract after match
								idx = nextIdx + match.length;
								
								//replace string in abstract
								abstract = abstract.slice(0,nextIdx) + "$" + symbol + "$" + abstract.slice(idx);
							}
						}
					}
				}
			}
			//reassign to abstract
			metaData["citation_abstract"] = abstract;
			
		} else {
			//fix double $$ for math in dynamically obtained abstract
			abstract = metaData["citation_download"];
			if (abstract != null && typeof(abstract) == 'object') abstract["citation_abstract"] = abstract["citation_abstract"].replace(/\$\$/g,"$");
		}
		//clear misc 
		metaData["citation_misc"] = "";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
