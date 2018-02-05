var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//get and fix title
		let temp = metaData["citation_title"].replace(/[\s]*[\-]+[\s]*ScienceDirect/,"").trim(), tempTwo = metaData["citation_journal_title"].trim();
		if (tempTwo != "") tempTwo = " -- " + tempTwo;
		metaData["citation_title"] = temp + tempTwo;
		metaData["citation_journal_title"] = "";
		
		
		//fix authors
		tempTwo = metaData["citation_authors"].replace(/^[^\:]*\:[\s]*/,"").replace(/(?:[\s]+and[\s]+|[\s]*\,[\s]*)/g," ; ");
		if (tempTwo.search(/[^\s\;]/) == -1) {
			tempTwo = "";
			temp = metaData["citation_misc"].replace(new RegExp("[\s]*" + BINResources.escapeForRegExp(temp) + "[\s]*",""),"").split(/[\s]+by[\s]+/);
			if (temp != null && temp.length > 1) {
				tempTwo = temp[1].replace(/[\s]+on[\s]+ScienceDirect.*$/,"").replace(/(?:[\s]+and[\s]+|[\s]*\,[\s]*)/g," ; ");
			}
		}
		metaData["citation_authors"] = tempTwo;
		
		//fix date
		temp = metaData["citation_date"];
		if (temp != "") {
			temp = temp.match(/[0-9][0-9][0-9][0-9]/);
			if (temp != null && temp.length > 0) {
				metaData["citation_date"] = temp[0];
			} else {
				metaData["citation_date"] = "";
			}
		}
		
		//clean misc
		metaData["citation_misc"] = "";
		
		//fix type
		metaData["citation_type"] = "book";
		
		//fix publisher
		if (metaData["citation_publisher"] == "") metaData["citation_publisher"] = "Elsevier B.V.";
		       
		//set database
		metaData["citation_database"] = "ScienceDirect";
		
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
