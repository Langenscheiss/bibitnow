var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix author
		var temp = metaData["citation_download"];
		if (metaData["query_summary"]["citation_authors"] != 2) temp = temp.replace(/(?:AU|A1)[\t\ ]+[\-]+[\t\ ]+/g,"BIT - ").trim();
		//fix issn if journal
		if (metaData["query_summary"]["citation_issn"] == 2) temp = temp.replace(/SN[\t\ ]+[\-]+[\t\ ]+/g,"BIT - ").trim();
		metaData["citation_download"] = temp;
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix author list
		var temp = metaData["citation_authors"];
		if(metaData["query_summary"]["citation_authors"] == 1) temp = temp.replace(/^.*[\s]by[\s]/i,"");
		temp = temp.replace(/[\ ]*\/[\ ]*/g," ; ").replace(/;[\ ]*$/,"");
		metaData["citation_authors"] = temp.trim();
		
		//fix publisher
		temp = metaData["citation_publisher"];
		if (temp == "") metaData["citation_publisher"] = "De Gruyter";
		
		//fix type
		temp = metaData["citation_journal_title"];
		if (temp == "") metaData["citation_type"] = "book";
	}
	
	// expose preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
