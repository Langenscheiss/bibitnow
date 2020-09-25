var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix author and journal
		let query = metaData["query_summary"]["citation_download"];
		if (query == 1) {
			query = metaData["citation_download"].replace(/A[U1][\t\ ]+[\-]+[\t\ ]+/g,"BIT - ");
		} else if (query == 2) {
			query = metaData["citation_download"];
		}
		metaData["citation_download"] = query.replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JF - ").replace(/PY[\t\ ]+[\-]+[\t\ ]+/,"Y1 - ").trim();
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix database
		metaData["citation_database"] = "ResearchGate";
		
		//fix publisher
		let temp = metaData["citation_misc"];
		metaData["citation_misc"] = "";
		if (temp != "") {
			if (metaData["query_summary"]["citation_misc"] == 1) {
				temp = temp.match(/Publisher[\s\:]+([^\;]+)(?:\;|$)/i);
				if (temp != null && temp.length > 1) {
					metaData["citation_publisher"] = temp[1].trim();
				}
			} else {
				temp = temp.split(/[\s]*;[\s]*/);
				if (temp != null && temp.length > 0) {
					
					//date
					metaData["citation_date"] = temp[0];
					
					if (temp.length > 3) {
						//journal info or citation_doi
						
						if (temp[1].search(/doi\:/i) == -1) {
						
							let volIss = temp[1].trim();
							volIss = volIss.replace(/^.*[\s]+([^\s]+\([^\s]+\).*$)/i,"$1").trim();
							if (volIss != "") {
								metaData["citation_volume"] = volIss.replace(/\(.*$/i,"").trim();
								metaData["citation_issue"] = volIss.replace(/(?:^.*\([\s]*|[\s]*\).*$)/gi,"");
								metaData["citation_firstpage"] = volIss.replace(/^.*\)[\:\s]*/gi,"");
							}
							volIss = temp[1].trim().replace(volIss,"").trim();
							metaData["citation_journal_title"] = volIss;
							
							//DOI
							if (temp[2].search(/doi/i) != -1) {
								metaData["citation_doi"] = temp[3].trim();
							}
						} else {
							metaData["citation_doi"] = temp[2].trim();
						}
					}
				}
			}
		}
		
		//fix journal if book
		if (metaData["citation_type"].search(/book/i) != -1) {
			metaData["citation_journal_title"] = "";
		}
		
		//fix abstract, prefer static
		temp = metaData["citation_abstract"].replace(/^[\s]*abstract[\:\s]*/i,"");
		metaData["citation_abstract"] = temp;
		if (temp != "" && (metaData = metaData["citation_download"]) != null && typeof(metaData) == 'object') {
			metaData["citation_abstract"] = "";
		}
		
		
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
