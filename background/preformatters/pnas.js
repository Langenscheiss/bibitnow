var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix author and journal
		var temp = metaData["citation_download"];
		temp = temp.replace(/A1[\t\ ]+[\-]+[\t\ ]+/,"AU - ").replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JF - ").trim();
		metaData["citation_download"] = temp;
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix journal abbreviation
		metaData["citation_journal_abbrev"] = "Proc. Natl. Acad. Sci. U.S.A.";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
