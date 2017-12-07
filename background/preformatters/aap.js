var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix journal abbrev and doi
		metaData["citation_download"] = metaData["citation_download"].replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JA - ").replace(/M3[\t\ ]+[\-]+[\t\ ]+/,"DO - ").trim();
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix abbreviation if necessary
		if(metaData["citation_download"]["citation_journal_abbrev"] == "hosppeds") metaData["citation_download"]["citation_journal_abbrev"] = "Hosp. Pediatr.";
		//do nothing
		
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
