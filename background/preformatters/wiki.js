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
		
		//remove unwanted properties from json
		metaData["citation_authors"] += " #BINCorpAuthor ";
		if ((metaData = metaData["citation_json"]) != null) {
			metaData["citation_title"] = "";
			metaData["citation_authors"] += " #BINCorpAuthor ";
		}
		//remove journal
		metaData["citation_journal"] = ""; metaData["citation_publisher"] = "";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
