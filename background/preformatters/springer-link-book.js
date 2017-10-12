var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix authors if necessary
		if (metaData["query_summary"][14] == -1) {
			metaData["citation_authors"] = metaData["citation_authors"].replace(/\ [^\ ]*\.[\ ]*\;/g," ;");
		}
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
