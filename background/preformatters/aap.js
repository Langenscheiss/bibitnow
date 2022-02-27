var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix journal abbrev and doi, remove abstract
		metaData["citation_download"] = metaData["citation_download"].replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JA - ").replace(/M3[\t\ ]+[\-]+[\t\ ]+/,"DO - ").trim();
	}


	//preformatting function
	function preformatData(metaData, parser) {

		//fix downloaded data if available
		const abstract = metaData["citation_abstract"];
		if ((metaData = metaData["citation_download"]) != null && typeof(metaData) == 'object') {
			//fix abbreviation if necessary
			if(metaData["citation_journal_abbrev"] == "hosppeds") metaData["citation_journal_abbrev"] = "Hosp. Pediatr.";

			//fix abstract, choose static abstract if available
			if (abstract != "") metaData["citation_abstract"] = "";
		}

	}

	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
