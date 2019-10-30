var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//split authors properly
		metaData["citation_authors"] = metaData["citation_authors"].replace(/;/g," ;").replace(/[\ ]+/g," ");
		
		//fix pages	
		let page = metaData["citation_firstpage"];
		if (metaData["citation_lastpage"] != "") {
			metaData["citation_firstpage"] = page.replace(/\-.*$/,"").trim();
		} else {
			page = page.split("-");
			if (page != null && page.length > 0) {
				metaData["citation_firstpage"] = page[0];
				if (page.length > 1) metaData["citation_lastpage"] = page[1];
			}
		}
		
		//fix abbreviation
		metaData["citation_journal_abbrev"] = "Darwiniana";
	}
	
	//return preformatting function
	return { preformatData : preformatData };

}());
