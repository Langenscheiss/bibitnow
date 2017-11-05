var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		// add subtitle if available
		var temp = metaData["citation_misc"].trim();
		
		if (temp != "") {
			metaData["citation_title"] = metaData["citation_title"] + " -- " + temp;
		}
		
		//clear journal
		metaData["citation_journal_title"] = "";
		
		//fix isbn, include only last
		metaData["citation_issn"] = metaData["citation_issn"].replace(/^.*,[\ ]*/,"").trim();
		
		// clear misc
		metaData["citation_misc"] = "";
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
