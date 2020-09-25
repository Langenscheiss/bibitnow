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
		metaData["citation_download"] = metaData["citation_download"].replace(/PY[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//downloaded
		let downloaded = metaData["citation_download"];
		let isValid = (downloaded != null && typeof(downloaded) == 'object');
		
		//fix publisher and date
		let bibField;
		
		if (isValid) {
			if (metaData["citation_publisher"] == "") {
				metaData["citation_publisher"] = downloaded["citation_publisher"];
			} else {
				//if publishers are completely different, prefer static publisher. Otherwise take download
				bibField = "(?:" + downloaded["citation_publisher"].replace(new RegExp("[^" + BINResources.getAllLetters() + "]+","gi"),"|").replace(/(?:^[\|\s]+|[\|\s]+$)/gi,"") + ")";
				if (metaData["citation_publisher"].search(new RegExp(bibField,"gi")) != -1 || metaData["citation_publisher"].search(/springer\ science\ \&\ business/i) != -1) {
					metaData["citation_publisher"] = downloaded["citation_publisher"];
				} else {
					metaData["citation_publisher"] = metaData["citation_publisher"].replace(/\,.*$/,"");
				}
			}
		} else if ((bibField = metaData["citation_publisher"]) != "") {
			metaData["citation_publisher"] = bibField.replace(/\,.*$/,"");
		}
		
		if ((bibField = metaData["citation_date"]) != "") {
			metaData["citation_date"] = bibField.replace(/^[^\,]*\,[\s]*/,"").replace(/[\s]*\-.*$/,"");
		} else if (isValid) {
			metaData["citation_date"] = downloaded["citation_date"];
		}
		
		//fix ISBN
		if ((bibField = metaData["citation_misc"]) != "") {
			metaData["citation_issn"] = bibField.replace(/^.*\;[\s]*ISBN[\s]*/,"").replace(/^[^\,]*\,[\s]*/,"").replace(/[^0-9X]+.*$/,"").replace(/^978/,"978-").replace(/^979/,"979-").replace(/[\-]+/g,"-");
		} else if (isValid) {
			metaData["citation_issn"] = downloaded["citation_issn"].replace(/^978/,"978-").replace(/^979/,"979-");
		}
		
		//fix author and title
		if (metaData["citation_title"] == "" && isValid) metaData["citation_title"] = downloaded["citation_title"];
		if (metaData["citation_authors"] == "" && isValid) metaData["citation_authors"] = downloaded["citation_authors"];
		       
		//clear journal title, downloaded ris and misc
		metaData["citation_download"] = "";
		metaData["citation_journal_title"] = "";
		metaData["citation_database"] = "Google Books";
		metaData["citation_misc"] = "";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData};

}());
