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
		var temp = metaData["citation_download"];
		temp = temp.replace(/LP[\t\ ]+[\-]+[\t\ ]+/,"EP - ").replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JA - ").replace(/M3[\t\ ]+[\-]+[\t\ ]+/,"DO - ").trim();
		metaData["citation_download"] = temp;
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix nothing so far
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
