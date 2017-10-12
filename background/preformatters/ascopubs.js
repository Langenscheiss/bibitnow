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
		temp = temp.replace(/J[OA][\t\ ]+[\-]+[\t\ ]+/,"BIT - ").replace(/PY[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").trim();
		metaData["citation_download"] = temp;
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//preformat misc for journal abbrev, issue and pages
		var temp = metaData["citation_misc"];
		metaData["citation_misc"] = "";
		if (temp != "") {
			
			//extract issn
			var tempTwo = temp.match(/issn%3D([0-9X\-]+)%26/i);
			if (tempTwo != null && tempTwo.length == 2) {
				metaData["citation_issn"] = tempTwo[1];
			}
			
			//extract pages
			tempTwo = temp.match(/startPage%3D(.*?)%26/i);
			if (tempTwo != null && tempTwo.length == 2) {
				
				//if found, check for endpage
				tempTwo = tempTwo[1];
				if (tempTwo != "") {
					metaData["citation_firstpage"] = tempTwo;
					
					tempTwo = temp.match(/endPage%3D(.*?)%26/i);
					if (tempTwo != null && tempTwo.length == 2) {
						tempTwo = tempTwo[1];
						if (tempTwo != "") {
							metaData["citation_lastpage"] = tempTwo;
						}
					}
				}
			}
			
			//extract volume
			tempTwo = temp.match(/volumeNum%3D(.*?)%26/i);
			if (tempTwo != null && tempTwo.length == 2) {
				if ((tempTwo = tempTwo[1]) != "0") metaData["citation_volume"] = tempTwo;
			}
			
			//extract issue
			tempTwo = temp.match(/issueNum%3D(.*?)%26/i);
			if (tempTwo != null && tempTwo.length == 2) {
				if ((tempTwo = tempTwo[1]) != "0") metaData["citation_issue"] = tempTwo;
			}
			
			//extract date
			tempTwo = temp.match(/publicationDate%3D(.*?)(?:%26|)$/i);
			if (tempTwo != null && tempTwo.length == 2) {
				tempTwo = tempTwo[1].replace(/%252F/g,"-");
				tempTwo = tempTwo.split("-");
				if (tempTwo != null && tempTwo.length == 3) {
					metaData["citation_date"] = tempTwo[1] + "-" + tempTwo[0] + "-" + tempTwo[2];
				}
			}
		}
		
		
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
