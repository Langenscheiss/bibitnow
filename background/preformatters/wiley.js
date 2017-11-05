var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix title and journal
		var temp = metaData["citation_download"];
		temp = temp.replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JF - ").replace(/TI[\t\ ]+[\-]+[\t\ ]+/,"T1 - ").trim();
		console.log(temp);
		metaData["citation_download"] = temp;
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix author list (if necessary, depends on Wiley journal)
		var temp = metaData["citation_authors"];
		temp = temp.replace(/[^;\ ];/g," ;");
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
		} else if (metaData["query_summary"]["citation_publisher"] >= 1) {
			metaData["citation_publisher"] = temp.replace(/^[^0-9]*[0-9]+\ /,"");
		}
		
	}
	
	// expose preformatting function
	return { preformatData : preformatData, preformatRawData: preformatRawData };

}());
