var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	//preformatting function
	function preformatData(metaData, parser) {

		//fix ISBN
		metaData["citation_issn"] = metaData["citation_issn"].replace(/^978/,"978-").replace(/^979/,"979-").replace(/[\-]+/g,"-");

		//fix type
		metaData["citation_type"] = "book";

	}

	// expose preformatting function
	return { preformatData : preformatData };

}());
