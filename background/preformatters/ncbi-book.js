var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		//fix journal
		if (metaData["citation_journal_title"] == "NCBI Bookshelf") metaData["citation_journal_title"] = "";
		       
		//fix abstract
		metaData["citation_abstract"] = metaData["citation_abstract"].replace(/^[\s]*(?:Abstract|Headline)[\s\:]*/i,"");
		
		//database
		metaData["citation_database"] = "NCBI Bookshelf";
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
