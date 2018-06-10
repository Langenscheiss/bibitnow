var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//GOD, THIS IS A TERRIBLE DATABASE!!!!
		
		//temporaries for volume, issue etc
		let vol = "", iss = "", date = "", pages = "", tempTwo = "";
		
		//misc field
		let temp = metaData["citation_misc"].trim();

		//first check whether citation summary from abstract page is available.
		let citationSummary = temp.replace(/^[^\ ]*/i,""); //summary
		temp = decodeURIComponent(temp.replace(/\ .*$/i,"")).replace(/\+/g," "); //link
		
		if (citationSummary != null && citationSummary != "") {
			
			//fix authors
			tempTwo = citationSummary.match(/Author[\ ]+;[\ ]+(.*)[\ ]+;[\ ]+Publication\ title/i);
			if (tempTwo != null && tempTwo.length > 1) {
				metaData["citation_authors"] = tempTwo[1].trim();
			}
			
			//fix doi
			tempTwo = citationSummary.match(/DOI[\ ]+;[\ ]+(.*?)[\ ]+;[\ ]+/i);
			if (tempTwo != null && tempTwo.length > 1) {
				metaData["citation_doi"] = tempTwo[1].trim();
			}
			
			//fix date
			tempTwo = citationSummary.match(/Publication[\ ]+date[\ ]+;[\ ]+(.*?)[\ ]+;[\ ]+/i);
			if (tempTwo != null && tempTwo.length > 1) {
				metaData["citation_date"] = tempTwo[1].trim();
			} else {
				date = metaData["citation_firstpage"];
			}
			
			//fix volume
			tempTwo = citationSummary.match(/Volume[\ ]+;[\ ]+(.*?)[\ ]+;[\ ]+/i);
			if (tempTwo != null && tempTwo.length > 1) {
				metaData["citation_volume"] = tempTwo[1].trim();
			} else {
				vol = metaData["citation_volume"];
			}
			
			//fix issue
			tempTwo = citationSummary.match(/Issue[\ ]+;[\ ]+(.*?)[\ ]+;[\ ]+/i);
			if (tempTwo != null && tempTwo.length > 1) {
				metaData["citation_issue"] = tempTwo[1].trim();
			} else {
				iss = metaData["citation_volume"];
			}
			
			//fix publisher
			tempTwo = citationSummary.match(/Publisher[\ ]+;[\ ]+(.*?)[\ ]+;[\ ]+/i);
			if (tempTwo != null && tempTwo.length > 1) {
				metaData["citation_publisher"] = tempTwo[1].trim();
			}
			
		} else if (temp != null && temp != "") {
			
			//if summary not available, try if download link is available, try to fix date, author, volume, pages from download link
			
			//fix authors
			tempTwo = temp.match(/auth=([^&]*)&/i);
			if (tempTwo != null && tempTwo.length > 1) {
				metaData["citation_authors"] = tempTwo[1];
			}
			
			//fix date
			tempTwo = temp.match(/date=([^&]*)&/i);
			if (tempTwo != null && tempTwo.length > 1) {
				metaData["citation_date"] = tempTwo[1];
			} else {
				date = metaData["citation_firstpage"];
			}
			
			//fix volume
			tempTwo = temp.match(/vol=([^&]*)&/i);
			if (tempTwo != null && tempTwo.length > 1) {
				metaData["citation_volume"] = tempTwo[1];
			} else {
				vol = metaData["citation_volume"];
			}
			
			//fix issue
			tempTwo = temp.match(/iss=([^&]*)&/i);
			if (tempTwo != null && tempTwo.length > 1) {
				metaData["citation_issue"] = tempTwo[1];
			} else {
				iss = metaData["citation_volume"];
			}
		}
		
		//fix pages
		tempTwo = metaData["citation_firstpage"];
		metaData["citation_firstpage"] = "";
		tempTwo = tempTwo.match(/.*\):[\ ]*([^\.]+)[\ \.]*$/);
		if (tempTwo != null && temp.length > 1) {
			tempTwo = tempTwo[1].split(/[\-]+/);
			if (tempTwo != null && tempTwo.length > 0) {
				if (tempTwo[0] != "") {
					metaData["citation_firstpage"] = tempTwo[0];
				}
				
			//try to fix last page, including number fix stolen from pubmed translator
				if (tempTwo.length > 1 && tempTwo[1] != "") {
					var length = 0;
					if ((length = tempTwo[0].length - tempTwo[1].length) > 0) {
						tempTwo[1] = tempTwo[0].slice(0,length) + tempTwo[1];
					}
					metaData["citation_lastpage"] = "" + tempTwo[1];
				}
			}
		}
		
		//if pages not fixed, try to fix from summary or link
		tempTwo = metaData["citation_firstpage"];
		if (tempTwo == "") {
			if (citationSummary != null && citationSummary != "") {
				tempTwo = citationSummary.match(/First[\ ]+page[\ ]+;[\ ]+(.*?)[\ ]+;[\ ]+/i);
				if (tempTwo != null && tempTwo.length > 1) {
					metaData["citation_doi"] = tempTwo[1].trim();
				}
			} else if (temp != null && temp != "") {
				tempTwo = temp.match(/pg=([^&]*)&/i);
				if (tempTwo != null && tempTwo.length > 1) {
					metaData["citation_firstpage"] = tempTwo[1];
				}
			}
			
		}
		
		//fix date from first page request if still necessary
		if (date != "") {
			temp = date.match(/\([^\(\)]+\)/i);
			if (temp != null && temp.length > 0) {
				metaData["citation_date"] = temp[0].trim();
			}
		}
		
		//fix volume from volume request if still necessary
		if (vol != "") {
			temp = vol.split(/[\.:;\ ]+/i);
			if (temp != null && temp.length > 0) {
				metaData["citation_volume"] = temp[0].trim();
			}
		}
		
		//fix issue from volume request if still necessary
		if (iss != "") {
			temp = iss.split(/[\.:;\ ]+/i);
			if (temp != null && temp.length > 1) {
				metaData["citation_issue"] = temp[1].trim();
			}
		}
		
		//fix doi
		metaData["citation_doi"] = metaData["citation_doi"].replace(/^.*DOI[\:\s]*/).trim();
		
		//unset misc
		metaData["citation_misc"] = "";
		
		//set database
		metaData["citation_database"] = "ProQuest Central";
		
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
