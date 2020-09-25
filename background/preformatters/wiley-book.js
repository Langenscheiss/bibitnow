var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix author list
		let authors = metaData["citation_authors"].replace(/^[^\:]*\:[\ ]*/,"").replace(/[\ ]*\,[\ ]*/g," ; ");
		let authorsTemp = authors;
		while (authorsTemp.search(/(?:^|[\s\,\;\.\-\/\:]+)(?:Prof\.|Dr\.|Professor|PhD)(?:[\s\,\;\.\-\/\:]+|$)/i) != -1 || authorsTemp.search(/(?:^|[\s\,\;\.\-\/\:]+)(?:[A-Z]{2,})(?:[\s\,\;\.\-\/\:]+|$)/) != -1) {
			authorsTemp = authorsTemp.replace(/(^|[\s\,\;\.\-\/\:]+)(?:Prof\.|Dr\.|Professor|PhD)([\s\,\;\.\-\/\:]+|$)/gi,"$1 $2").replace(/(^|[\s\,\;\.\/\:\-]+)(?:[A-Z]{2,})([\s\,\;\.\/\:\-]+|$)/g,"$1 $2");
		}
		authorsTemp = authorsTemp.replace(/[\s\,\;\.\-\/\:]*\;[\s\,\;\.\-\/\:]*/g, " ; ");
		if (authorsTemp.replace(/[\s\,\;\.]/gi,"") != "") authors = authorsTemp;
		metaData["citation_authors"] = authors;
				
		let misc = metaData["citation_misc"];
		if (misc == "") {
		
			//fix journal title for Cochrane
			if (metaData["citation_journal_title"] == "" && metaData["citation_misc"].search(/cochrane/i) != -1) {
				metaData["citation_journal_title"] = "Cochrane Database of Systematic Reviews";
				metaData["citation_journal_abbrev"] = "CDSR";
			}
			
			//fix publisher
			let publisher = metaData["citation_publisher"];
			if (publisher == "") {
				metaData["citation_publisher"] = "Wiley";
			} else if (metaData["query_summary"]["citation_publisher"] >= 1) {
				metaData["citation_publisher"] = publisher.replace(/^[^0-9]*[0-9]+[\ ]*/,"").replace(/^by[\ ]*/i,"");
			}
			
			//fix date (remove exact time of day!)
			metaData["citation_date"] = metaData["citation_date"].replace(/[0-9][0-9]?:[0-9][0-9]?/,"");
		} else {
			//fix date
			let match = misc.match(/published:([^;]+);/i);
			if (match != null && match.length > 1) {
				metaData["citation_date"] = match[1].trim();
			}
			
			//fix isbn
			match = misc.match(/print[\s]+isbn:([^\|]+)\|/i);
			if (match != null && match.length > 1) {
				metaData["citation_isbn"] = match[1].trim();
			} else {
				match = misc.match(/isbn:([^\|]+)\|/i);
				if (match != null && match.length > 1) {
					metaData["citation_isbn"] = match[1].trim();
				}
			}
			
			//fix publisher
			if (metaData["citation_publisher"] == "") {
				match = misc.match(/((?:Copyright|©)[^;]+);/i);
				if (match != null && match.length > 1) {
					//check that copyright line does not include authors and includes keywords "Wiley" or "Blackwell"
					match = match[1].trim();
					let matchUpper = match.toUpperCase();
					let authors = metaData["citation_authors"].split(" ; ");
					let length = 0;
					if (authors != null && (length = authors.length) > 0) {
						for (let i = 0; i<length; ++i) {
							if (matchUpper.search(authors[i].toUpperCase()) != -1) {
								length = 0;
								break;
							}
						}
					}
					if (BINResources.asciiPunctuation(match,2).search(/(?:^|[\s\,\.\-])(?:Blackwell|Wiley)(?:$|[\s\,\.\-])/i) == -1) length = 0;
					
					//assign to publisher only if valid publisher, otherwise set standard
					if (length == 0) match = "John Wiley & Sons, Ltd."
					metaData["citation_publisher"] = match;
				}
			}
		}
		
		//fix abstract
		metaData["citation_abstract"] = metaData["citation_abstract"].replace(/(?:^[\s]*Product[\s]*Information[\s]*|^[\s]*About[\s]*The[\s]*Product[\s]*)/gi,"").replace(/(?:^[\s]*Product[\s]*Information[\s]*|^[\s]*About[\s]*The[\s]*Product[\s]*)/gi,"").replace(/[\.]+[\s]*show[\s]*(?:more|less)[\s]*$/i,"").trim();
		
		//fix type
		metaData["citation_type"] = "book";
		
		//database
		metaData["citation_database"] = "Wiley Online Library";
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
