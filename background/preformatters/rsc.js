var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//do nothing
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix type and publisher for book
		if (metaData["query_summary"]["citation_issn"] == 1) {
			metaData["citation_type"] = "book";
			if (metaData["citation_publisher"] == "") metaData["citation_publisher"] = "The Royal Society of Chemistry";
		}
		
		//fix book authors
		if (metaData["query_summary"]["citation_authors"] == 1) {
			metaData["citation_authors"] = metaData["citation_authors"].replace(/^(?:Author|Editor)[s]?[\:\s]*/i,"").replace(/,[\s]+/g,"; ");
		}
	}

	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
