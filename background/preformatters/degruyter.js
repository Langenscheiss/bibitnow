var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix author list
		var temp = metaData["citation_authors"];
		if(metaData["query_summary"][14] == -1) temp = temp.replace(/^.*[\s]by[\s]/i,"");
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
	return { preformatData : preformatData };

}());
