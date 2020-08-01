var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix title, journal title, date, abstract
		metaData["citation_download"] = metaData["citation_download"].replace(/DA[\t\ ]+[\-]+[\t\ ]+/,"Y1 - ").replace(/AB[\t\ ]+[\-]+[\t\ ]+/,"N2 - ").trim();
		
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
				
		//fix authors if necessary
		if (metaData["query_summary"]["citation_authors"] == 1) {
			metaData["citation_authors"] = metaData["citation_authors"].replace(/\ [^\ ]*\.[\ ]*\;/g," ;");
		}
		
		//fix date
		let temp;
		if (metaData["query_summary"["citation_date"] == 3] && (temp = metaData["citation_date"]) != "") {
			temp = temp.match(/[0-9]{4}[\s]*$/);
			if (temp.length > 0) {
				metaData["citation_date"] = temp[0].trim(); 
			}
		}
		
		//fix type
		metaData["citation_type"] = "book";
		
		//prefer static publisher, date, abstract
		temp = metaData["citation_download"];
		if (temp != null && typeof(temp) == 'object') {
			if (metaData["citation_date"] != "") temp["citation_date"] = "";
			if (metaData["citation_publisher"] != "") temp["citation_publisher"] = "";
			if (metaData["citation_abstract"] != "") temp["citation_abstract"] = "";
		}
		
		//set database
		metaData["citation_database"] = "Springer Link";
	}	
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
