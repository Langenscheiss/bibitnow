var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix date and doi
		metaData["citation_download"] = metaData["citation_download"].replace(/M3[\t\ ]+[\-]+[\t\ ]+/,"DO - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix beginning of abstract
		let abstract = metaData["citation_abstract"].replace(/^Abstract[\s\:]+/i,"");

// 		//fix math in abstract, math symbols saved in citation_misc
// 		let mathSymbols = metaData["citation_misc"];
// 
// 		if (mathSymbols != "" && (mathSymbols = mathSymbols.split(/[\ ]+;[\ ]+/)) != null) {
// 			const length = mathSymbols.length;
// 			if (length%2 == 0) {
// 				//index variable
// 				let idx = 0;
// 				for (let i = 0; i<length; ++i) {
// 				
// 					//get match and math symbol from misc
// 					let match = mathSymbols[i].trim();
// 					i++;
// 					let symbol = mathSymbols[i].trim();
// 					match += symbol;
// 					
// 					//continue only if not empty string
// 					if (symbol != "") {
// 						
// 						//search for match in abstract text
// 						let nextIdx = abstract.indexOf(match,idx);
// 						
// 						//if found, replace by math
// 						if (nextIdx != -1) {
// 							
// 							//get new index in abstract after match
// 							idx = nextIdx + match.length;
// 							
// 							//replace string in abstract
// 							abstract = abstract.slice(0,nextIdx) + "$" + symbol + "$" + abstract.slice(idx);
// 							
// 							//get index in NEW abstract where to start searching from!
// 							idx = nextIdx + symbol.length+3;
// 						}
// 					}
// 				}
// 			}
// 		}
		
		//reassign abstract
		metaData["citation_abstract"] = abstract;
		
		//fix url
		metaData["citation_url"] = metaData["citation_url"].replace(/^[\s]*doi[\s\:]*/gi,"");
		
		//preprint number
		if ((abstract = metaData["citation_firstpage"]) != "" && metaData["citation_lastpage"] == "") {
			metaData["citation_archive_id"] = abstract;
			metaData["citation_firstpage"] = "";
		}
		
		//fix authors
		metaData["citation_authors"] = BINResources.htmlDecode(metaData["citation_authors"]).replace(/\,[^\;]*(?:|;)/gi," ; ");
		
		//set database
		metaData["citation_database"] = "bioRxiv Preprint Server";
		
		//prefer static abstract, date, doi and url
		const download = metaData["citation_download"];
		if (download != null && typeof(download) == 'object') {
			if (metaData["citation_abstract"] != "") {
				download["citation_abstract"] = "";
			}
			if (metaData["citation_date"] != "") {
				download["citation_date"] = "";
			}
			if (metaData["citation_doi"] != "") {
				download["citation_doi"] = "";
			}
			if (metaData["citation_url"] != "") {
				download["citation_url"] = "";
			}
			
			//fix authors
			download["citation_authors"] = BINResources.htmlDecode(download["citation_authors"]).replace(/\,[^\;]+\,/gi,",");
			
			//fix misc
			download["citation_misc"] = "";
		}
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
