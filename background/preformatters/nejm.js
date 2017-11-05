var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix title, year and journal abbreviation. Do not use title from citation download, due to latex characters
		var temp = metaData["citation_download"];
		temp = temp.replace(/SN[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").trim();
		metaData["citation_download"] = temp;
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix pages from short citation
		var citString = metaData["citation_firstpage"];
		metaData["citation_firstpage"] = "";
		var temp = citString.match(/[:]+[0-9\-]*$/);
		if (temp != null && temp.length > 0) {
			temp = temp[0].replace(/^[:]+/,"").trim();
			temp = temp.split(/[\-]+/);
			if (temp != null && temp.length > 0) {
				metaData["citation_firstpage"] = temp[0].trim();
				if (temp.length > 1) {
					metaData["citation_lastpage"] = temp[1].trim();
				}
			}
		}
		
		//fix volume and issue from rights link
		temp = metaData["citation_misc"].match(/volumeNum%3D([^%]*)/);
		if (temp != null && temp.length > 1) {
			metaData["citation_volume"] = temp[1].replace(/^0$/,"").trim();
		} else {
			//fix volume from short citation if necessary
			temp = citString.match(/[;]+([0-9]*)[:]+/);
			if (temp != null && temp.length > 1) {
				metaData["citation_volume"] = temp[1].replace(/^0$/,"").trim();
			}
		}
		temp = metaData["citation_misc"].match(/issueNum%3D([^%]*)/);
		if (temp != null && temp.length > 1) {
			metaData["citation_issue"] = temp[1].replace(/^0$/,"").trim();
		}
		metaData["citation_misc"] = "";
		
		//manually set issn
		metaData["citation_issn"] = "1533-4406";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
