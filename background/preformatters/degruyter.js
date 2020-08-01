var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
				
		//fix issn if journal
		if (metaData["query_summary"]["citation_issn"] == 2) metaData["citation_download"] = metaData["citation_download"].replace(/SN[\t\ ]+[\-]+[\t\ ]+/g,"BIT - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//if book type found, remove inbook title
		if (metaData["citation_type"] == "book") metaData["citation_collection_title"] = "";
		
		//fix type and authors for books
		if (metaData["citation_journal_title"] == "") {
			//type = book
			metaData["citation_type"] = "book";
			
			//remove dynamically obtained authors
			if (metaData["citation_download"] != null && typeof(metaData["citation_download"]) == 'object') metaData["citation_download"]["citation_authors"] = "";
		       
			//get authors from static date
			let authors = metaData["citation_authors"];
			authors = authors.replace(/^Ed\.[\s]*by[\s]*/,"");
			if(metaData["query_summary"]["citation_authors"] == 2) authors = authors.replace(/^.*[\s]by[\s]/i,"");
			metaData["citation_authors"] = authors.replace(/[\ ]*\/[\ ]*/g," ; ").replace(/;[\ ]*$/,"").trim();
		} else {
			//prefer static author info if from meta data
			if (metaData["query_summary"]["citation_authors"] == 1 && metaData["citation_download"] != null && typeof(metaData["citation_download"]) == 'object') {
				metaData["citation_download"]["citation_authors"] = "";
			}
		}
		
		//fix abstract
		metaData["citation_abstract"] = metaData["citation_abstract"].replace(/^Abstract[:\s]*/,"");
		
		//fix publisher
		if (metaData["citation_publisher"] == "") metaData["citation_publisher"] = "De Gruyter";
		
		
	}
	
	// expose preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
