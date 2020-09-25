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
		let downloaded = metaData["citation_download"].replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JA - ").trim();
		
		//find whether it's a book, and then correct metaData
		if (downloaded.search(/TY[\ ]*\-[\ ]*BOOK/i) != -1) {
			metaData["citation_type"] = "book";
			metaData["citation_firstpage"] = "";
		}
		
		metaData["citation_download"] = downloaded;
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix issn
		if (metaData["citation_journal_title"] == "Journal of the Physical Society of Japan") {
			metaData["citation_issn"] = "0031-9015";
		}
		
		//fix journal
		if (metaData["query_summary"]["citation_journal_title"] != 0) {
			metaData["citation_journal_title"] = "JPS Conference Proceedings";
			metaData["citation_journal_abbrev"] = "JPS Conf. Proc.";
		}
		
		//fix publisher
		if (metaData["citation_publisher"] == "") {
			metaData["citation_publisher"] = "The Physical Society of Japan";
			let temp = metaData["citation_download"];
			if (temp != null && typeof(temp) == 'object') {
				temp["citation_publisher"] = "";
			}
		}
		
		//fix misc		
		metaData["citation_misc"] = metaData["citation_misc"].replace(/number/i,"issue");
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
