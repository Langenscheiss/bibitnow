var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix title and journal
		metaData["citation_download"] = metaData["citation_download"].replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JF - ").replace(/TI[\t\ ]+[\-]+[\t\ ]+/,"T1 - ").trim();
		
		//fix abstract if necessary
		if (metaData["query_summary"]["citation_download"] == 2) {
			metaData["citation_download"] = metaData["citation_download"].replace(/AB[\t\ ]+[\-]+[\t\ ]+/,"N2 - ").trim();
		}
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix database
		metaData["citation_database"] = "Wiley Online Library";
		
		//fix author list (if necessary, depends on Wiley journal)
		metaData["citation_authors"] = metaData["citation_authors"].replace(/[\s]*;/g, ' ;');
		
		//fix journal title for Cochrane
		if (metaData["citation_journal_title"] == "" && metaData["citation_misc"].search(/cochrane/i) != -1) {
			metaData["citation_journal_title"] = "Cochrane Database of Systematic Reviews";
			metaData["citation_journal_abbrev"] = "Cochrane Database Syst. Rev.";
		}
		
		//fix publisher
		let publisher = metaData["citation_publisher"];
		if (publisher == "") {
			metaData["citation_publisher"] = "Wiley";
		} else if (metaData["query_summary"]["citation_publisher"] >= 1) {
			metaData["citation_publisher"] = publisher.replace(/^[^0-9]*[0-9]+\ /,"");
		}
		
		//fix abstract, prefer static
		let abstract = metaData["citation_abstract"].replace(/^[\s]*(?:abstract[\:\s]*|Jump[\s]*to…)/gi,"").replace(/^[\s]*(?:abstract[\:\s]*|Jump[\s]*to…)/gi,"").replace(/(?:Copyright[\s]*)?©.*$/i,"").trim();
		
		//fix math in abstract, math symbols saved in citation_misc
		let mathSymbols = metaData["citation_misc"];
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
		
		//clear static misc
		metaData["citation_misc"] = "";
		
		//fix abstract
		metaData["citation_abstract"] = abstract;
		if ((metaData = metaData["citation_download"]) != null && typeof(metaData) == 'object') {
			metaData["citation_abstract"] = (abstract != "") ? "" : metaData["citation_abstract"].replace(/(?:Copyright[\s]*)?©.*$/i,"").trim();
			
			//clear dynamic misc
			metaData["citation_misc"] = "";
		}		
	}
	
	// expose preformatting function
	return { preformatData : preformatData, preformatRawData: preformatRawData };

}());
