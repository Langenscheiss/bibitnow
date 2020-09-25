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
		metaData["citation_download"] = metaData["citation_download"].replace(/(SN|N1)[\t\ ]+[\-]+[\t\ ]+/g,"BIT - ").trim();
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix pages from short citation
		let citString = metaData["citation_firstpage"];
		metaData["citation_firstpage"] = "";
		let bibField = citString.match(/[:]+([0-9\-]*)$/);
		if (bibField != null && bibField.length > 1) {
			bibField = bibField[1].trim().split(/[\-]+/);
			if (bibField != null && bibField.length > 0) {
				metaData["citation_firstpage"] = bibField[0].trim();
				if (bibField.length > 1) {
					metaData["citation_lastpage"] = bibField[1].trim();
				}
			}
		}
		
		//fix volume and issue from rights link
		bibField = metaData["citation_misc"].match(/volumeNum%3D([^%]*)/);
		if (bibField != null && bibField.length > 1) {
			metaData["citation_volume"] = bibField[1].replace(/^0$/,"").trim();
		} else {
			//fix volume from short citation if necessary
			bibField = citString.match(/[;]+([0-9]*)[:]+/);
			if (bibField != null && bibField.length > 1) {
				metaData["citation_volume"] = bibField[1].replace(/^0$/,"").trim();
			}
		}
		bibField = metaData["citation_misc"].match(/issueNum%3D([^%]*)/);
		if (bibField != null && bibField.length > 1) {
			metaData["citation_issue"] = bibField[1].replace(/^0$/,"").trim();
		}
		metaData["citation_misc"] = "";
		
		//fix abstract
		metaData["citation_abstract"] = metaData["citation_abstract"].replace(/(?:^Abstract[\s]*|[\s]*Full[\s]*text[\s]*of[\s]*[^\s]+?[\.]{3}[\s]*|[\s]*Read[\s]*the[\s]*full[\s]*article.*$)/gi," ").trim();
		
		//manually set issn
		metaData["citation_issn"] = "1533-4406";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
