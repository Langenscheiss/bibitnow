var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix journal abbreviation
		metaData["citation_download"] = metaData["citation_download"].replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JA - ").replace(/TI[\t\ ]+[\-]+[\t\ ]+/,"T1 - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//get math from misc, and pass volume, issue to misc
		let mathSymbols = metaData["citation_misc"];
		metaData["citation_misc"] = metaData["citation_volume"].replace(/vol[\.]+/i,"volume").replace(/no[\.]+/i,"issue");
		metaData["citation_volume"] = "";
		
		//check if first page is available, and reformat if yes. Otherwise, reset first page
		let temp;
		if (metaData["query_summary"]["citation_firstpage"] == 2) {
			metaData["citation_firstpage"] = metaData["citation_firstpage"].replace(/(^.*,[\s]+|[\s]*\([^\(\)]*\)[\s]*$)/gi,"");
		} else if (metaData["query_summary"]["citation_firstpage"] == 1) {
			temp = metaData["citation_firstpage"].match(/\,[^\(\,]+\(/i)
			if (temp != null && temp.length > 0) {
				metaData["citation_firstpage"] = temp[0].replace(/[\ \,\(]/g,"").trim();
			} else {
				metaData["citation_firstpage"] = "";
			}
		}
		
		//fix math in abstract, math symbols saved in citation_misc
		let abstract = metaData["citation_abstract"].replace(/^[\s]*abstract[\:\s]*/i,"");
		if (abstract != "" && mathSymbols != "" && (mathSymbols = mathSymbols.split(/[\ ]+;[\ ]+/)) != null) {
			const length = mathSymbols.length;
			if (length%2 == 0) {
				//index variable
				let idx = 0;
				for (let i = 0; i<length; ++i) {
				
					//get match and math symbol from misc
					let match = mathSymbols[i].trim();
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
							abstract = abstract.slice(0,nextIdx) + "$" + symbol + "$" + abstract.slice(idx);
							
							//get index in NEW abstract where to start searching from!
							idx = nextIdx + symbol.length+2;
						}
					}
				}
				//reduce white spaces around dollars
				abstract = abstract.replace(/[\ ]+\$/g, " $").replace(/\$[\ ]+/, "$ ");
			}
		}
		//reassign abstract
		metaData["citation_abstract"] = abstract;
		
		//prefer static abstract
		if ((metaData = metaData["citation_download"]) != null && typeof(metaData) == 'object') {
			if (abstract != "") metaData["citation_abstract"] = "";
		}
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
