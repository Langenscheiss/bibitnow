var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		
		//fix title and journal
		let temp = metaData["citation_download"];
		temp = temp.replace(/JO[\t\ ]+[\-]+[\t\ ]+/,"JF - ").replace(/TI[\t\ ]+[\-]+[\t\ ]+/,"T1 - ").trim();
		
		//fix date
		if (temp.search(/DA[\t\ ]+[\-]+[\t\ ]+/) != -1) {
			temp = temp.replace(/Y1[\t\ ]+[\-]+[\t\ ]+/,"BIT - ").replace(/DA[\t\ ]+[\-]+[\t\ ]+/,"Y1 - ").trim();
		}
		
		//fix abstract if necessary
		if (metaData["query_summary"]["citation_download"] == 2) {
			temp = temp.replace(/AB[\t\ ]+[\-]+[\t\ ]+/,"N2 - ").trim();
		}
		
		//fix type if collection title available
		if (metaData["citation_collection_title"] != "" && temp.search(/(?:^|\n)TY[\t\ ]+[\-]+[\t\ ]+/) == -1) {
			temp = "TY - CHAP\n" + temp + "\nER -";
		}
		//reassign
		metaData["citation_download"] = temp;
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix database
		metaData["citation_database"] = "Wiley Online Library";
		
		//fix author list (if necessary, depends on Wiley journal)
		metaData["citation_authors"] = metaData["citation_authors"].replace(/[\s]*;/g, ' ;');
		
		//if collection title available, further format author list
		if (metaData["citation_collection_title"] != "") {
			//fix author list
			let authors = metaData["citation_authors"].replace(/^[^\:]*\:[\ ]*/,"").replace(/[\ ]*\,[\ ]*/g," ; ");
			let authorsTemp = authors;
			while (authorsTemp.search(/(?:^|[\s\,\;\.\-\/\:]+)(?:Prof\.|Dr\.|Professor|PhD)(?:[\s\,\;\.\-\/\:]+|$)/i) != -1 || authorsTemp.search(/(?:^|[\s\,\;\.\-\/\:]+)(?:[A-Z]{2,})(?:[\s\,\;\.\-\/\:]+|$)/) != -1) {
				authorsTemp = authorsTemp.replace(/(^|[\s\,\;\.\-\/\:]+)(?:Prof\.|Dr\.|Professor|PhD)([\s\,\;\.\-\/\:]+|$)/gi,"$1 $2").replace(/(^|[\s\,\;\.\/\:\-]+)(?:[A-Z]{2,})([\s\,\;\.\/\:\-]+|$)/g,"$1 $2");
			}
			authorsTemp = authorsTemp.replace(/[\s\,\;\.\-\/\:]*\;[\s\,\;\.\-\/\:]*/g, " ; ");
			if (authorsTemp.replace(/[\s\,\;\.]/gi,"") != "") authors = authorsTemp;
			metaData["citation_authors"] = authors;
		}
		
		//fix journal title for Cochrane
		if (metaData["citation_journal_title"] == "" && metaData["citation_misc"].search(/cochrane/i) != -1) {
			metaData["citation_journal_title"] = "Cochrane Database of Systematic Reviews";
			metaData["citation_journal_abbrev"] = "Cochrane Database Syst. Rev.";
		}
		
		//fix publisher
		let publisher = metaData["citation_publisher"];
		if (publisher == "") {
			metaData["citation_publisher"] = "John Wiley & Sons, Ltd.";
		} else if (metaData["query_summary"]["citation_publisher"] >= 1) {
			
			//remove copyright symbol
			publisher = publisher.replace(/^[^0-9]*[0-9]+\ /,"").trim();
			
			//check that copyright line does not include authors and includes keywords "Wiley" or "Blackwell"
			let matchUpper = publisher.toUpperCase();
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
			if (BINResources.asciiPunctuation(publisher,2).search(/(?:^|[\s\,\.\-])(?:Blackwell|Wiley)(?:$|[\s\,\.\-])/i) == -1) length = 0;
			
			//assign to publisher only if valid publisher, otherwise set standard
			if (length == 0) publisher = "John Wiley & Sons, Ltd."
			metaData["citation_publisher"] = publisher;
		}
		
		//fix abstract, prefer static
		let abstract = metaData["citation_abstract"].replace(/^[\s]*(?:abstract[\:\s]*|Jump[\s]*to…)/gi,"").replace(/^[\s]*(?:abstract[\:\s]*|Jump[\s]*to…)/gi,"").replace(/(?:Copyright[\s]*)?©.*$/i,"").trim();
		
		//fix math in abstract, math symbols saved in citation_misc
		let mathSymbols = metaData["citation_misc"];
		if (abstract != "" && mathSymbols != "" && (mathSymbols = mathSymbols.split(/[\ ]+;[\ ]+/)) != null) {
			const length = mathSymbols.length;
			if (length%2 == 0) {
				//index variable
				let idx = 0;
				for (let i = 0; i<length; ++i) {
				
					//get match and math symbol from misc
					let match = mathSymbols[i].trim();
					i++;
					let symbol = mathSymbols[i].trim();
					match += " " + symbol;
					
					//continue only if not empty string
					if (symbol != "") {
						
						//search for match in abstract text
						let nextIdx = abstract.indexOf(match,idx);
						
						//if found, replace by math
						if (nextIdx != -1) {
							
							//get index in OLD abstract after match
							idx = nextIdx + match.length;

							//convert symbol
							symbol = BINResources.convertSpecialChars(symbol,0,false,true);
							
							//replace string in abstract
							abstract = abstract.slice(0,nextIdx) + "$" + symbol + "$" + abstract.slice(idx);
							
							//get index in NEW abstract where to start searching from!
							idx = nextIdx + symbol.length+2;
						}
					}
				}
				//reduce white spaces around dollars
				abstract = abstract.replace(/[\ ]+\$/g, " $").replace(/\$[\ ]+/, "$ ");
			}
		}
		
		//clear static misc
		metaData["citation_misc"] = "";
		
		//fix abstract
		metaData["citation_abstract"] = abstract;
		if ((publisher = metaData["citation_download"]) != null && typeof(publisher) == 'object') {
			publisher["citation_abstract"] = (abstract != "") ? "" : publisher["citation_abstract"].replace(/(?:Copyright[\s]*)?©.*$/i,"").trim();
			
			//clear dynamic misc
			publisher["citation_misc"] = "";
			
			//prefer static authors
			if (metaData["citation_authors"] != "") {
				publisher["citation_authors"] = "";
			}
			
			//fix pages
			if (metaData["citation_lastpage"] != "" && metaData["citation_firstpage"] != "" && publisher["citation_lastpage"] == "") {
				publisher["citation_firstpage"] = "";
			}
		}
		
	}
	
	// expose preformatting function
	return { preformatData : preformatData, preformatRawData: preformatRawData };

}());
