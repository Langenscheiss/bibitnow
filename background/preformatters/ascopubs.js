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
		metaData["citation_download"] = metaData["citation_download"].replace(/(?:J[OA][\t\ ]+[\-]+[\t\ ]+|PY[\t\ ]+[\-]+[\t\ ]+)/g,"BIT - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix authors
		if (metaData["query_summary"]["citation_authors"] == 2) {
			metaData["citation_authors"] = metaData["citation_authors"].replace(/Search[\s]+for[\s]+articles[\s]+by[\s]+this[\s]+author[\s]+/g,"");
		}
		
		//preformat misc for journal abbrev, issue and pages
		let temp = metaData["citation_misc"];
		metaData["citation_misc"] = "";
		const rightsLink = (metaData["query_summary"]["citation_misc"] == 1);
		if (temp != "") {
			
			let tempTwo;
			
			//extract issn
			if (rightsLink) {
				tempTwo = temp.match(/issn%3D([0-9X\-]+)%26/i);
				if (tempTwo != null && tempTwo.length == 2) {
					metaData["citation_issn"] = tempTwo[1];
				}
			}
			
			//extract pages
			tempTwo = temp.match(/startpage(?:%3D|=)(.*?)(?:%26|&|$)/i);
			if (tempTwo != null && tempTwo.length == 2) {
				
				//if found, check for endpage
				tempTwo = tempTwo[1];
				if (tempTwo != "") {
					metaData["citation_firstpage"] = tempTwo;
					
					if (rightsLink) {
						tempTwo = temp.match(/endPage%3D(.*?)%26/i);
						if (tempTwo != null && tempTwo.length == 2) {
							tempTwo = tempTwo[1];
							if (tempTwo != "") {
								metaData["citation_lastpage"] = tempTwo;
							}
						}
					}
				}
			}
			
			//extract volume
			tempTwo = temp.match(/volume(?:Num%3D|=)(.*?)(?:%26|&|$)/i);
			if (tempTwo != null && tempTwo.length == 2) {
				if ((tempTwo = tempTwo[1]) != "0") metaData["citation_volume"] = tempTwo;
			}
			
			//extract issue
			tempTwo = temp.match(/issue(?:Num%3D|_number=)(.*?)(?:%26|&|$)/i);
			if (tempTwo != null && tempTwo.length == 2) {
				if ((tempTwo = tempTwo[1]) != "0") metaData["citation_issue"] = tempTwo;
			}
			
			//move issue to volume if no volume
			if (metaData["citation_volume"] == "" && (tempTwo = metaData["citation_issue"]) != "") {
				metaData["citation_volume"] = tempTwo; metaData["citation_issue"] = "";
			}
			
			//extract date
			tempTwo = temp.match(/(?:publicationDate%3D|cover_date=)(.*?)(?:%26|;|&|$)/i);
			if (tempTwo != null && tempTwo.length == 2) {
				tempTwo = tempTwo[1].replace(/%252F/g,"-").split("-");
				if (tempTwo != null && tempTwo.length == 3) {
					metaData["citation_date"] = tempTwo[1] + "-" + tempTwo[0] + "-" + tempTwo[2];
				}
			}
		}
		
		//fix abstract, choose static one if available
		let download = metaData["citation_download"];
		if (download != null && typeof(download) == 'object') {
			if (metaData["citation_abstract"] != "" ) download["citation_abstract"] = "";
			if (metaData["citation_firstpage"] != "" ) download["citation_firstpage"] = "";
		       //move issue to volume if no volume
			if (download["citation_volume"] == "" && (tempTwo = download["citation_issue"]) != "") {
				download["citation_volume"] = tempTwo; download["citation_issue"] = "";
			}
		}
		
		
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
