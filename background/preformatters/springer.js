var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix title, journal title, date
		metaData["citation_download"] = metaData["citation_download"].replace(/JO[\t\ ]+[\--]+[\t\ ]+/,"JF - ").replace(/TI[\t\ ]+[\--]+[\t\ ]+/,"T1 - ").replace(/DA[\t\ ]+[\-]+[\t\ ]+/,"Y1 - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//nothing to do yet
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
