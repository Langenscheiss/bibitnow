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
		
		//fix author string
		metaData["citation_authors"] = metaData["citation_authors"].replace(/^[\s]*by[\s]+/gi,"").replace(/(?:[\s]+[\,\;]*and[\,\;]*[\s]+|[\s]*[\,\;]+[\s]*)/g, " ; ");
				
		//hardcode journal title, publisher
		metaData["citation_journal_title"] = "The New York Times";
		metaData["citation_journal_abbrev"] = "The NYT";
		metaData["citation_publisher"] = "The New York Times Company";
		
		//add issn (taken from wiki)
		metaData["citation_issn"] = "0362-4331";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
