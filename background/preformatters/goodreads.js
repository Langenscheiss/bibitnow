var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix publisher and date
		let misc = metaData["citation_misc"].replace(/^.*Published[\s]*/,"");
		metaData["citation_date"] = misc.replace(/[\s]*by.*$/i,"");
		metaData["citation_publisher"] = misc.replace(/^.*[\s]+by[\s]*/i,"").replace(/\([^\(\)]*\)$/,"").trim();
		
		//fix ISBN
		metaData["citation_issn"] = metaData["citation_issn"].replace(/^978/,"978-").replace(/^979/,"979-").replace(/[\-]+/g,"-");
		
		//clear journal title and misc
		metaData["citation_journal_title"] = "";
		metaData["citation_database"] = "Goodreads Inc.";
		metaData["citation_misc"] = "";
	}

	// expose preformatting function
	return { preformatData : preformatData };

}());
