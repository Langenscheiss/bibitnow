var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//manually set journal
		metaData["citation_journal_title"] = "ArXiv e-prints";
		metaData["citation_journal_abbrev"] = "arXiv";
		
		//preformat url
		var temp = metaData["citation_url"];
		temp = temp.replace("/pdf/","/abs/");
		metaData["citation_url"] = temp;
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
