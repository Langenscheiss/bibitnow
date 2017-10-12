var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix title, year and journal abbreviation
		var temp = metaData["citation_download"];
		temp = temp.replace(/J(A|O)[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").replace(/PY[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").trim();
		metaData["citation_download"] = temp;
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//preformat misc for journal, volume, issue and pages
		var temp = metaData["citation_misc"];
		if (temp != "") {
			
			//get volume
			temp = temp.replace(/^[^0-9]*/,"").trim();
			metaData["citation_volume"] = temp.replace(/([\(:]|,[\s]*issue).*$/i,"").trim();
			
			//get issue if available
			var tempTwo = temp.match(/issue[^\,:]*[\,:]/i);
			if (tempTwo != null && tempTwo.length > 0) {
				metaData["citation_issue"] = tempTwo[0].replace(/issue/gi,"").replace(/[\,:]$/,"").trim();
				temp = temp.replace(/^[^\(:]*/,"").trim();
			} else {
				temp = temp.replace(/^[^\(:]*/,"").trim();
				if (temp.charAt(0) != ":") metaData["citation_issue"] = temp.replace(/\).*$/,"").replace(/^\(/,"").trim();
			}
			
			//get pages
			temp = temp.replace(/^[^:]*:/,"").replace(/\..*$/,"").trim();
			if (temp != "") {
				temp = temp.split("-");
				if (temp != null) {
					if (temp.length > 0) metaData["citation_firstpage"] = temp[0];
					if (temp.length > 1) metaData["citation_lastpage"] = temp[1];
				}
			}
		}
	}
	
	// expose preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData};

}());
