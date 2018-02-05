var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix ISSN
		let temp = "";
		if ((temp = metaData["citation_url"]) != "") {
			metaData["citation_issn"] = temp.replace(/^.*com\//,"").replace(/\/.*$/,"");
		}
		
		//fix beginning of abstract
		let abstract = metaData["citation_abstract"].replace(/(?:^Abstract[\:\s]*|[\s]*?view[\s]*?full[\s\-]*?text[\s]*$)/gi,"").replace(/[\s]/g," ");
		
		//fix math in abstract
		let mathSymbols = metaData["citation_misc"];
		if (mathSymbols != "" && (mathSymbols = mathSymbols.split(/[\ ]+;[\ ]+/)) != null) {
			const length = mathSymbols.length;
			if (length%2 == 0) {
				//index variable
				let idx = 0;
				for (let i = 0; i<length; ++i) {
				
					//get match and math symbol from misc
					let match = "  " + mathSymbols[i].trim();
					i++;
					let symbol = mathSymbols[i].trim();
					match += " " + symbol;
					
					//continue only if not empty string
					if (symbol != "") {
						
						//search for match in abstract text
						let nextIdx = abstract.indexOf(match,idx);
						
						//if found, replace by math
						if (nextIdx != -1) {
							//get index in OLD abstract after match
							idx = nextIdx + match.length;
							
							//convert symbol
							symbol = BINResources.convertSpecialChars(symbol,0,false,true);
							
							//replace string in abstract
							abstract = abstract.slice(0,nextIdx) + " $" + symbol + "$" + abstract.slice(idx);
							
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
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
