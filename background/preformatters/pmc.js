var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatRawData(metaData, parser) {
		
		//fix abstract, date, journal abbreviation and authors
		metaData["citation_download"] = metaData["citation_download"].replace(/AB[\t\ ]+[\-]+[\t\ ]+/,"N2 - ").replace(/J1[\t\ ]+[\-]+[\t\ ]+/,"JA - ").replace(/(?:Y1|A[U1])[\t\ ]+[\-]+[\t\ ]+/g,"BIT - ").replace(/PY[\t\ ]+[\-]+[\t\ ]+/,"Y1 - ").trim();
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//clear misc 
		metaData["citation_misc"] = "";
		
		//prefer static publisher
		if (metaData["citation_publisher"] != "") {
			let download = metaData["citation_download"]; 
			if (download != null && typeof(download) == 'object') download["citation_publisher"] = "";
		}
		
		//set database
		metaData["citation_database"] = "PubMed Central"
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
