var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix title, year and journal abbreviation
		metaData["citation_download"] = metaData["citation_download"].replace(/LP[\t\ ]+[\-]+[\t\ ]+/,"EP - ").replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JA - ").replace(/M3[\t\ ]+[\-]+[\t\ ]+/,"DO - ").trim();
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix abstract, prefer statically obtained
		if ((metaData = metaData["citation_download"]) != null && typeof(metaData) == 'object') metaData["citation_abstract"] = "";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
