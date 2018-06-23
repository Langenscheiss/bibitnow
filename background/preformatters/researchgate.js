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
		metaData["citation_download"] = metaData["citation_download"].replace(/A[U1][\t\ ]+[\-]+[\t\ ]+/g,"BIT - ").replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JF - ").trim();
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix database
		metaData["citation_database"] = "ResearchGate";
		
		//fix publisher
		let temp = metaData["citation_misc"];
		metaData["citation_misc"] = "";
		if (temp != "") {
			temp = temp.match(/Publisher[\s\:]+([^\;]+)(?:\;|$)/i);
			if (temp != null && temp.length > 1) {
				metaData["citation_publisher"] = temp[1].trim();
			}
		}
		
		//fix journal if book
		if (metaData["citation_type"].search(/book/i) != -1) {
			metaData["citation_journal_title"] = "";
		}
		
		//fix abstract, prefer static
		temp = metaData["citation_abstract"].replace(/^[\s]*abstract[\:\s]*/i,"");
		metaData["citation_abstract"] = temp;
		if (temp != "" && (metaData = metaData["citation_download"]) != null && typeof(metaData) == 'object') {
			metaData["citation_abstract"] = "";
		}
		
		
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
