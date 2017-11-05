var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		
		//fix journal abbreviation
		var temp = metaData["citation_download"];
		temp = temp.replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JA - ").trim();
		
		//find whether it's a book, and then correct metaData
		if (temp.search(/TY[\ ]*\-[\ ]*BOOK/i) != -1) {
			metaData["citation_type"] = "book";
			metaData["citation_firstpage"] = "";
		}
		
		metaData["citation_download"] = temp;
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix misc
		metaData["citation_misc"] = metaData["citation_misc"].replace(/number/i,"issue");
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
