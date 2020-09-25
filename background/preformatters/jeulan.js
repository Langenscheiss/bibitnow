var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		//fix static volume
		metaData["citation_volume"] = metaData["citation_volume"].replace(/[\(\)]+$/gi,"");
		
		//fix keywords
		metaData["citation_keywords"] = metaData["citation_keywords"].replace(/[\s][\s]+/gi,", ");
	}

	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
