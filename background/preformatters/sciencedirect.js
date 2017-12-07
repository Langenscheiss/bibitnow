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
		metaData["citation_download"] = metaData["citation_download"].replace(/DA[\t\ ]+[\-]+[\t\ ]+/,"Y1 - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//remove volume, issue, page from misc string and send the rest to date
		metaData["citation_date"] = metaData["citation_misc"].replace(/(?:volume|issue|page[s]?)[^,;]+[,;\ ]*/gi,"").replace(/[\ ]+/g," ").trim();
		
		//fix issn
		let bibField = metaData["citation_issn"].replace(/.*journal\//,"").replace(/[^0-9X\-]/g,"");
		if (bibField.search(/\-/) == -1 && bibField.length == 8) {
			metaData["citation_issn"] = bibField.slice(0,4) + "-" + bibField.slice(4);
		}
		
		//reformat author names to account for science direct specific formatting
		
		bibField = metaData["citation_authors"];
		if (bibField != "") {
			let authorString = "";
			let length;
			switch (metaData["query_summary"]["citation_authors"]) {
				case 1:
					bibField = bibField.replace(/;[\ ]*$/,"").split(";");
					length = bibField.length;
					if (bibField != null) {						
						for(let i = 0; i<length; ++i) {
							let name = bibField[i].trim();
							let idx = name.search(/\.[\ ]+[^\.\ ][^\.\ ]+/);
							if (idx > 0 && idx < name.length-1) {
								name = name.slice(idx+1).trim() + ", " + name.slice(0,idx).trim() + " ; ";
								authorString += name;
							} else {
								authorString = "";
								break;
							}
						}
					}
					break;
				case 2:
					//difficult, take full name and determine whether subsequent names are part of full name
					bibField = bibField.split(/[\ ]*;[\ ]*/);
					if (bibField != null && (length = bibField.length) > 1) {
						let fullName = bibField[0];
						for (let i = 1; i<length; ++i) {
							let substr = new RegExp("^"+bibField[i]);
							if (fullName.search(substr) != -1) {
								authorString += bibField[i] + " ";
								fullName = fullName.replace(substr,"");
							} else {
								authorString += "; ";
								fullName = bibField[i];
							}
						}
					}
					break;
			}
			if (authorString != "") metaData["citation_authors"] = authorString.trim();
		}
		
		//fix publisher
		if (metaData["citation_publisher"] == "") metaData["citation_publisher"] = "Elsevier B.V.";
		
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };
}());
