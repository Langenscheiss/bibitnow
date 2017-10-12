var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//split authors properly
		var temp = metaData["citation_authors"];
		temp = temp.replace(/;/g," ;").replace(/[\ ]+/g," ");
		metaData["citation_authors"] = temp;
		
		temp = metaData["citation_firstpage"];
		if (metaData["citation_lastpage"] != "") {
			metaData["citation_firstpage"] = temp.replace(/\-.*$/,"").trim();
		} else {
			temp = temp.split("-");
			if (temp != null && temp.length > 0) {
				metaData["citation_firstpage"] = temp[0];
				if (temp.length > 1) metaData["citation_lastpage"] = temp[1];
			}
		}
	}
	
	//return preformatting function
	return { preformatData : preformatData };

}());
