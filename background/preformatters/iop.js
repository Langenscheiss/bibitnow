var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		
		//downloaded citation is crap on iop journals (books are ok actually)
		if (metaData["citation_type"].search(/isbn/i) == -1) metaData["citation_download"] = metaData["citation_download"].replace(/(?:A1|AU)[\t\ ]+[\-]+[\t\ ]+/g,"BIT - ").replace(/(?:AB)[\t\ ]+[\-]+[\t\ ]+/g,"N2 - ").trim();
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix pages
		let queryNum = metaData["query_summary"]["citation_firstpage"];
		let misc;
		if (queryNum == 1) {
			misc = metaData["citation_firstpage"].replace(/^.*page[s]?[\s]*/i,"");
			metaData["citation_lastpage"] = misc.replace(/^.*to[\s]*/i,"").trim();
			metaData["citation_firstpage"] = misc.replace(/[\s]*to.*$/i,"").trim();
		}
		
		//check if book
		misc = metaData["citation_type"];
		queryNum = metaData["query_summary"]["citation_title"];
		if (misc.search(/isbn/i) != -1) {
			misc = misc.split(";");
			if (misc != null && misc.length > 0) {
				misc = misc[0].trim();
				metaData["citation_type"] = "book";
				metaData["citation_issn"] = misc;
				
				//fix title depending on whether book or chapter
				if (queryNum != 2) {
					metaData["citation_collection_title"] = "";
				}
				
				//fix subtitle
				misc = metaData["citation_misc"];
				if (misc != "") {
					let title;
					if (queryNum != 2) {
						title = metaData["citation_title"];
						if (title != "") {
							metaData["citation_title"] = title + " -- " + misc;
						}
					} else {
						title = metaData["citation_collection_title"];
						if (title != "") {
							metaData["citation_collection_title"] = title + " -- " + misc;
						}
					}
				}
				
				//fix author if book
				metaData["citation_authors"] = metaData["citation_authors"].replace(/([\s]+and[\s]+|[\s]*\,[\s]*)/g," ; ");
			}
		} else if (queryNum == 2) {
			
			//set type
			metaData["citation_type"] = "book";
			
			//fix subtitle
			misc = metaData["citation_misc"];
			if (misc != "") {
				let title = metaData["citation_collection_title"];
				if (title != "") {
					metaData["citation_collection_title"] = title + " -- " + misc;
				}
			}
			
			//fix author if book
			metaData["citation_authors"] = metaData["citation_authors"].replace(/([\s]+and[\s]+|[\s]*\,[\s]*)/g," ; ");
		} else {
			metaData["citation_collection_title"] = "";
		}
		
		//fix dynamic title, date and abstract
		misc = metaData["citation_download"];
		if (misc != null && typeof(misc) == 'object') {
			
			//prefer static title and collection title
			if (metaData["citation_title"] != "") {
				misc["citation_title"] = "";
			}
			
			if (metaData["citation_collection_title"] != "") {
				misc["citation_collection_title"] = "";
			}
			
			misc = misc["citation_date"];
			if (misc != "") {
				let date = metaData["citation_date"];
				metaData["citation_download"]["citation_date"] = date.search(new RegExp("" + BINResources.escapeForRegExp(misc))) != -1 ? date : misc;
			}
			
			//if abstract obtained dynamically, extract math expressions
			if ((misc = metaData["citation_download"]["citation_abstract"]) != "") {
				metaData["citation_download"]["citation_abstract"] = misc.replace(/##[A-Z]+##[\s]*\[[^\]]*?\][\s]*?\{\$[\s]*(.*?)[\s]*\$\}/g, 
					function(match, $1, offset, original) {
						return "$"+$1+"$";
					}
				).replace(/##[A-Z]+##[\s]*\[[^\]]*?\][\ ]?/g,"");
			}
		}
		
		//fix publisher
		if (metaData["citation_publisher"] == "") metaData["citation_publisher"] = "IOP Publishing";
		
		//reset citation_misc
		metaData["citation_misc"] = "";
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
