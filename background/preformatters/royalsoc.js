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
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		//get issn
		let issn = metaData["citation_misc"];
		metaData["citation_misc"] = "";
		if (issn.search(/online[\s]+issn/i) != -1) {
			issn = issn.replace(/^.*online[\s]+issn[\s\:\.\,]*/i,"").replace(/([0-9\-]+).*$/,"$1");
			metaData["citation_issn"] = issn;
		}
	}

	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
