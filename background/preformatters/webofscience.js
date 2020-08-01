var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//do nothing, as there is no dynamic citation export being requested
	}
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//hardcode database
		metaData["citation_database"] = "Web of Science";
		
		//helper vars
		let fieldValue = "", length = 0;
		
		//fix type
		metaData["citation_type"] = metaData["citation_type"].replace(/(?:^.*document[\s]+type:|view[\s]+journal[\s]+impact)/gi,"");
		
		//fix authors
		fieldValue = metaData["citation_authors"].replace(/\;[\s]+\;.*$/,"");
		length = fieldValue.match(/\([^\)]+\)\[/g);
		let data = "";
		if (length != null) {
			fieldValue = length;
			length = fieldValue.length;
			for (let i = 0; i<length; ++i) {
				data += fieldValue[i].replace(/(?:^\(|\)\[)/g,"") + " ; ";
			}
		} else {
			length = fieldValue.match(/\([^\)]+\)[\s]*(?:;|$)/g);
			if (length != null) {
				fieldValue = length;
				length = fieldValue.length;
				for (let i = 0; i<length; ++i) {
					data += fieldValue[i].replace(/(?:^\(|\)\[)/g,"") + " ; ";
				}
			}
		}
		metaData["citation_authors"] = data.replace(/[\s\;]+$/,"");
		
		//fix misc info
		fieldValue = metaData["citation_volume"];
		metaData["citation_volume"] = "";
		//extract several bibfields if misc valid
		if (fieldValue != "") {
			
			//connect keywords to bibfields
			const keywords = ["volume","(?:issue|article[\\s]*number)","page","doi","published"];
			const bibFields = ["citation_volume","citation_issue","citation_firstpage","citation_doi","citation_date"];
			const signals = "[\\s]*(?:article[\\s]+|doi|issue|page|published|view[\\s]+|$)";
			
			//loop over all keyword-bibfield pairs
			length = keywords.length;
			for (let i = 0; i<length; ++i) {
				data = fieldValue.match(new RegExp(keywords[i] + "[s\\:\\s]+(.*?)" + signals,"i"));
				if (data != null && data.length > 1) {
					metaData[bibFields[i]] = data[1];
				}
			}
			//fix date format
			fieldValue = metaData["citation_date"];
			if (fieldValue.search(/[a-z]/i) != -1) {
				metaData["citation_date"] = fieldValue.replace(/[0-9]{4}/,
					function(match, offset, original) {
						return ("(" + match + ")");
					}
				);
			}
		}
		
		//fix abstract and keywords
		fieldValue = metaData["citation_misc"];
		metaData["citation_misc"] = "";
		metaData["citation_abstract"] = fieldValue.replace(/(?:^.*[\s]+\;[\s]+abstract[\s]*|[\s]+\;[\s]+keyword.*$)/gi,"");
		metaData["citation_keywords"] = fieldValue.replace(/^.*[\s]+\;[\s]+keywords[\s]*/gi,"").replace(/[\s]*author[\s]+keyword[s]*[\s\:]*/i,"").replace(/[\s]+(?:keywords|author[\s]+inf).*$/i,"").replace(/[\s]*keyword[s]*[\s]+plus[\s\:]*/i,"");
		
		//fix issn
		metaData["citation_issn"] = fieldValue.replace(/^.*[\s]+ISSN[\s\:]+/,"").replace(/[\s]+.*$/,"");
		
		//fix isbn
		metaData["citation_isbn"] = fieldValue.replace(/^.*[\s]+ISBN[\s\:]+/,"").replace(/[\s]+.*$/,"");
		
		//fix journal title
		metaData["citation_journal_title"] = BINResources.toTitleCase(metaData["citation_journal_title"].trim(),true);
	}
	
	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
