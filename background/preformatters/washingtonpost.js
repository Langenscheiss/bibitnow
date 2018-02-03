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
		
		//fix date, remove time of day depending on which request was successful
		if (metaData["query_summary"]["citation_date"] == 1) {
			//remove time of day
			metaData["citation_date"] = metaData["citation_date"].replace(/T.*$/i,"");
		} else if (metaData["query_summary"]["citation_date"] == 2) {
			//assume current year
			metaData["citation_date"] = metaData["citation_date"].replace(/[\s]*at.*$/i,"") + " " + (new Date()).getFullYear();
		}
		
		//add issn (taken from wiki)
		metaData["citation_issn"] = "0190-8286";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
