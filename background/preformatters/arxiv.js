var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix beginning of abstract
		let abstract = metaData["citation_abstract"].replace(/^Abstract:[\ ]+/,"");

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
							
							//get index in NEW abstract where to start searching from!
							idx = nextIdx + symbol.length+3;
						}
					}
				}
			}
		}
		
		//reassign abstract
		metaData["citation_abstract"] = abstract;
		
		//clear misc 
		metaData["citation_misc"] = "";
		
		//manually set journal
		metaData["citation_journal_title"] = "ArXiv e-prints";
		metaData["citation_journal_abbrev"] = "arXiv";
		metaData["citation_database"] = "ArXiv e-prints";
		
		//preformat url
		metaData["citation_url"] = metaData["citation_url"].replace("/pdf/","/abs/");
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData };

}());
