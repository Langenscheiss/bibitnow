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
		metaData["citation_authors"] = metaData["citation_authors"].replace(/[\s]*,[\s]*/g," ; ");
		
		//fix date
		metaData["citation_date"] = metaData["citation_misc"].replace(/^.*Veröffentlicht[\s]*;[\s]*/,"").replace(/;.*$/,"");
		metaData["citation_misc"] = "";
				
		//fix journal and database
		metaData["citation_journal_title"] = "";
		metaData["citation_database"] = "genialokal.de Onlineshop"
	}
	
	// expose preformatter
	return { preformatData : preformatData };

}());
