var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//yeah, JSON data, easy to parse
		let jsonSource = null;
		try {
			//parse to json object
			jsonSource = JSON.parse(metaData["citation_download"]);
			
			//dummy string in citation_download to suggest successful data retreival
			metaData["citation_download"] = "TY - JOUR\nER -";
			
		} catch(exception) {
			
			jsonSource = null;
			//indicate that download was not successful
			metaData["citation_download"] = "";
		}
		
		//continue if json valid
		let jsonResponse = null;
		if (jsonSource != null && typeof(jsonSource) == 'object' && (jsonResponse = jsonSource.response) != null && typeof(jsonResponse) == 'object' && (jsonResponse = jsonResponse.docs) != null && Array.isArray(jsonResponse) && (jsonResponse = jsonResponse[0]) != null && typeof(jsonResponse) == 'object') {
			//copy common bibfields from json into metaData
			const bibitems = [ ["citation_type","typeOfWork"],["citation_title","title"],["citation_date","itemDate"] ];
			for (let i = 0; i<3; ++i) {
				let response = jsonResponse[bibitems[i][1]];
				if (response != null && response != "") metaData[bibitems[i][0]] = response.trim();
			}
			
			//fix date
			metaData["citation_date"] = metaData["citation_date"].replace(/[\s]*T.*Z[\s]*$/,"");
		}
		
// 		if (jsonSource != null && typeof(jsonSource) == 'object' && (jsonResponse = jsonSource["facet_counts"]) != null && typeof(jsonResponse) == 'object' && (jsonResponse = jsonResponse["facet_fields"]) != null && typeof(jsonResponse) == 'object') {
// 			//TODO
// 		}
	}
	
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//fix isbn
		if (metaData["query_summary"]["citation_issn"] == 1 && metaData["citation_issn"].length == 9) {
			metaData["citation_issn"] = metaData["citation_issn"] + "0";
		}
		
		//fix publisher
		if (metaData["query_summary"]["citation_publisher"] == 2) {
			metaData["citation_publisher"] = metaData["citation_publisher"].replace(/^.*Awarding[\s]+Institution[\s]*[\:]+[\s]*/i,"");
		} else if (metaData["query_summary"]["citation_publisher"] == 1) {
			let source = metaData["citation_publisher"];
			
			//get publisher if necessary
			metaData["citation_publisher"] = source.replace(/^.*?Publisher[\s]*[\:]*[\s]*/i,"").replace(/[\s]*(?:Record|Issue|ISSN|ISBN|Publi|Journal|Volume|Webs|Host).*$/,"");
			
			//get journal if necessary
			if (metaData["citation_journal_title"] == "") metaData["citation_journal_title"] = source.replace(/^.*?Journal[\s]*[\:]*[\s]*/,"").replace(/[\s]*(?:Record|Publi|Volume|ISSN|Page|Issue|Webs|Identifier|see[\s]+more).*$/,"");
		       
			//get volume if necessary
			if (metaData["citation_volume"] == "") metaData["citation_volume"] = source.replace(/^.*?Volume[\s]*[\:]*[\s]*/,"").replace(/[\s]*(?:Record|Page|Journal|Publi|ISSN|Issue|Webs|Identifier|see[\s]+more).*$/,"");
		       
			//get issue if necessary
			if (metaData["citation_issue"] == "") metaData["citation_issue"] = source.replace(/^.*?Issue[\s]*[\:]*[\s]*/,"").replace(/[\s]*(?:Record|Date|Page|Journal|Publi|ISSN|Volume|Webs|Identifier|see[\s]+more).*$/,"");
			
			//get issn if necessary
			if (metaData["citation_issn"] == "") metaData["citation_issn"] = source.replace(/^.*?ISSN[\s]*[\:]*[\s]*/,"").replace(/[\s]*(?:Doi|Source|Record|Page|Journal|Publi|Issue|Volume|Webs|Identifier|see[\s]+more).*$/,"");
		       
			//get isbn if necessary
			if (metaData["citation_issn"] == "") metaData["citation_issn"] = source.replace(/^.*?ISBN(?:-13|)[\s]*[\:]*[\s]*/,"").replace(/[\s]*(?:Doi|Source|UUID|URN|Page|Journal|Pub|Issue|Volume|Webs|Identifier|see[\s]+more).*$/,"");
		       
			//get doi if necessary
			if (metaData["citation_doi"] != "") metaData["citation_doi"] = metaData["citation_doi"].replace(/^http[s]?:\/\/[^\/]*\//i,"").replace(/(?:^[^0-9]*|[\s])/g,"").trim();
			if (metaData["citation_doi"].search(/^10\.[0-9]{4,5}\//) == -1) metaData["citation_doi"] = source.replace(/^.*?Doi[\s]*[\:]*[\s]*/i,"").replace(/[\s]*(?:Source|[E]*ISSN|UUID|URN|Page|Journal|Pub|Issue|Volume|Webs|Identifier|see[\s]+more).*$/,"");

		       //get pages if necessary
			if (metaData["citation_firstpage"] == "") metaData["citation_firstpage"] = source.replace(/^.*?Page[s]*[\s]*[\:]*[\s]*/,"").replace(/[\s]*(?:Source|Doi|Record|Volume|Journal|Issue|Publi|ISSN|Webs|Identifier|see[\s]+more).*$/,"");
		}
		
		//fix authors
		metaData["citation_authors"] = metaData["citation_authors"].replace(/[\s]*[\+]+[\s]*/g,"");
		if (metaData["citation_type"].search(/thesis/i) == -1) {
			metaData["citation_authors"] = metaData["citation_authors"].replace(/\,[\s]*[A-Z]{2,}[\s]*(?:;|$)/g,
				function(match, offset, original) {
					return match.replace(/[^\,\;\s]/g,
						function(match, offset, original) {
							return "" + match + ". ";
						}
					);
				}
			);
		}
		
		//fix abstract
		if (metaData["query_summary"]["citation_abstract"] == 2) {
			metaData["citation_abstract"] = metaData["citation_abstract"].replace(/^.*?\.html\('/i,"").replace(/'\);.*$/,"").trim();
		}
		metaData["citation_abstract"] = metaData["citation_abstract"].replace(/^Abstract[\s\:]*/i,"");
		
		//set database
		metaData["citation_database"] = "Oxford University Research Archive";
	}

	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
