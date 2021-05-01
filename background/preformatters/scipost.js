var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//do nothing
	}


	//preformatting function
	function preformatData(metaData, parser) {
		//extract journal abbreviation from misc
		metaData["citation_journal_abbrev"] = metaData["citation_misc"].replace(/^.*;[\s]+JA[\s\-]+/gi,"").replace(/[\s]+;.*$/gi,"");

    //extract abstract from misc
    let abstract = metaData["citation_misc"].replace(/^.*;[\s]+AB[\s\-]+/gi,"").replace(/[\s]+;.*$/gi,"");
    if (abstract != null && abstract != "") metaData["citation_abstract"] = abstract;

    //fix misc
		metaData["citation_misc"] = "";
	}

	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
