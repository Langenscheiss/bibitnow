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
		metaData["citation_download"] = metaData["citation_download"].replace(/AB[\t\ ]+[\-]+[\t\ ]+/,"N2 - ").replace(/A1[\t\ ]+[\-]+[\t\ ]+/,"AU - ").replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JF - ").replace(/(?:PB)[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//prefer static title and abstract
		let download = metaData["citation_download"];
		if (download != null && typeof(downoad) == 'object') {
			if (metaData["citation_abstract"] != "") download["citation_abstract"] = "";
		        if (metaData["citation_title"] != "") download["citation_title"] = "";
		}
		metaData["citation_database"] = "OSA Publishing"
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
