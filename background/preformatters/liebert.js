var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix doi and journal abbreviation, and remove abstract
		//metaData["citation_download"] = metaData["citation_download"].replace(/N2[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").replace(/M3[\t\ ]+[\-]+[\t\ ]+/,"DO - ").replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JA - ").trim();
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		//prefer date from static source
		if(metaData["citation_date"] != "") {
			metaData["citation_download"]["citation_date"] = "";
		}
	}

	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
