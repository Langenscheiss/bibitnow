var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix doi and journal abbreviation, and remove abstract
		metaData["citation_download"] = metaData["citation_download"].replace(/A[1U][\t\ ]+[\-]+[\t\ ]+/gi,"BIT - ").replace(/N2[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").replace(/M3[\t\ ]+[\-]+[\t\ ]+/,"DO - ").replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JA - ").trim();
	}


	//preformatting function
	function preformatData(metaData, parser) {

    //fix issn
    metaData["citation_issn"] = metaData["citation_issn"].replace(/^.*issn[\s]*/gi,"").replace(/[^\-0-9X].*$/gi,"").trim();

	}

	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
