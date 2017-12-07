var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//preformat misc for date
		let bibField = metaData["citation_misc"];
		let bibFieldTwo = "";
		if (bibField != "") {
			bibFieldTwo = bibField.match(/Published[^;\(]*/i);
			if (bibFieldTwo != null && bibFieldTwo.length > 0) {
				metaData["citation_date"] = bibFieldTwo[0].replace(/^Published[\s ]*[:]*/i,"").trim();
			}
			metaData["citation_misc"] = "";
		}
		
		//preformat isbn
		bibField = metaData["citation_issn"];
		if (bibField != null) {
			bibFieldTwo = bibField.match(/ISBN[^;\(]*/i);
			if (bibFieldTwo != null && bibFieldTwo.length > 0) {
				metaData["citation_issn"] = bibFieldTwo[0];
			} else {
				metaData["citation_issn"] = "";
			}
		}
		
		//fix publisher
		metaData["citation_publisher"] = metaData["citation_publisher"].replace(/[\ ]*\(OUP\)$/,"");
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
