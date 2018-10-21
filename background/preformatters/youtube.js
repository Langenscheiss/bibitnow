var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//do nothing, as there is no dynamic citation export being requested
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix database and author
		metaData["citation_authors"] = " #BINCorpAuthor " + metaData["citation_authors"].trim();
		metaData["citation_database"] = "Youtube";
		
		//fix type and publisher
		metaData["citation_type"] = "#BINMiscType";
		metaData["citation_publisher"] = "Youtube";
		
		//empty misc
		metaData["citation_misc"] = "";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
