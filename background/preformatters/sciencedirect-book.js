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
		var temp = metaData["citation_title"].replace(/[\s]*[\-]+[\s]*ScienceDirect/,"").trim();
		var tempTwo = "";
		if ((tempTwo = metaData["citation_journal_title"].trim()) != "") tempTwo = " -- " + tempTwo;
		metaData["citation_title"] = temp + tempTwo;
		metaData["citation_journal_title"] = "";
		
		
		//fix authors
		var tempTwo = metaData["citation_authors"].replace(/^[^\:]*\:[\s]*/,"").replace(/([\s]+and[\s]+|[\s]*\,[\s]*)/g," ; ");
		if (tempTwo.search(/[^\s\;]/) == -1) {
			tempTwo = "";
			temp = "[\s]*" + temp + "[\s]*";
			temp = new RegExp(temp,"");
			temp = metaData["citation_misc"].replace(temp,"");
			temp = temp.split(/[\s]+by[\s]+/);
			if (temp != null && temp.length > 1) {
				tempTwo = temp[1].replace(/[\s]+on[\s]+ScienceDirect.*$/,"").replace(/([\s]+and[\s]+|[\s]*\,[\s]*)/g," ; ");
			}
		}
		metaData["citation_authors"] = tempTwo;
		
		//fix date
		temp = "";
		if ((temp = metaData["citation_date"]) != "") {
			temp = temp.match(/[0-9][0-9][0-9][0-9]/);
			if (temp != null && temp.length > 0) {
				temp = temp[0];
			} else {
				temp = "";
			}
		}
		metaData["citation_date"] = temp;
		
		//clean misc
		metaData["citation_misc"] = "";
		
		//fix type
		metaData["citation_type"] = "book";
		
		//fix publisher
		if (metaData["citation_publisher"] == "") metaData["citation_publisher"] = "Elsevier B.V.";
		
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
