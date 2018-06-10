var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
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
		
		//set database
		metaData["citation_database"] = "Springer Link";
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
