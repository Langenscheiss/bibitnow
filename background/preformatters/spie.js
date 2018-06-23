var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		
		//downloaded citation is crap on iop journals (books are ok actually)
// 		if (metaData["citation_type"].search(/isbn/i) == -1) metaData["citation_download"] = metaData["citation_download"].replace(/(?:A1|AU)[\t\ ]+[\-]+[\t\ ]+/g,"BIT - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//reset citation_misc
		metaData["citation_misc"] = "";
		
		//fix database
		metaData["citation_database"] = "SPIE Digital Library"
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
