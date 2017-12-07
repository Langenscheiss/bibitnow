var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatRawData(metaData, parser) {
		//fix doi
		metaData["citation_download"] = metaData["citation_download"].replace(/N1[\t\ ]+[\-]+[\t\ ]+/,"DO - ").replace(/T1[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").trim();
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//do nothing
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
