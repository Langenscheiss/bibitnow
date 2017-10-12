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
		temp = temp.replace(/^[^\:]*\:[\ ]*/,"").replace(/[\ ]*\,[\ ]*/g," ; ");
		metaData["citation_authors"] = temp;
		
		//fix journal title for Cochrane
		temp = metaData["citation_journal_title"];
		if (temp == "") {
			temp = metaData["citation_misc"];
			if (temp.search(/cochrane/i) != -1) {
				metaData["citation_journal_title"] = "Cochrane Database of Systematic Reviews";
				metaData["citation_journal_abbrev"] = "CDSR";
			}
		}
		
		//fix publisher
		if ((temp = metaData["citation_publisher"]) == "") {
			metaData["citation_publisher"] = "Wiley";
		} else if (metaData["query_summary"][11] <= -1) {
			metaData["citation_publisher"] = temp.replace(/^[^0-9]*[0-9]+[\ ]*/,"").replace(/^by[\ ]*/i,"");
		}
		
		//fix isbn
		if ((temp = metaData["citation_issn"]) != "") {
			metaData["citation_issn"] = temp.replace(/^978/,"978-").replace(/^979/,"979-").replace(/[\-]+/g,"-");
		}
		
		//fix type
		metaData["citation_type"] = "book";
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
