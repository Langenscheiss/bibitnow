var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
			
		//fix authors
		metaData["citation_authors"] = metaData["citation_authors"].replace(/[\ ]*,[\ ]*/," ; ");
		
		//fix date
		metaData["citation_date"] = metaData["citation_misc"].replace(/^.*Veröffentlicht[\s]*;[\s]*/,"").replace(/;.*$/,"");
		metaData["citation_misc"] = "";
				
		//fix journal
		metaData["citation_journal_title"] = "";
	}
	
	// expose preformatter
	return { preformatData : preformatData };

}());
