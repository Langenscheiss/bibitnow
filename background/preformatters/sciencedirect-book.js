var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	//preformatting function
	function preformatData(metaData, parser) {
		
		//completely rewritten
		
		//extract some fields from misc
		let citationData = metaData["citation_misc"]; 
		metaData["citation_misc"] = "";
		
		//get isbn
		let value = citationData.match(/ISBN[\s]*([^;]*)[\s]*(?:;|$)/);
		if (value != null && value.length > 1) {
			metaData["citation_isbn"] = value[1].replace(/[^0-9X\-]+/gi,"");
		}
		
		//get doi
		value = citationData.match(/DOI[\s]*([^;]*)[\s]*(?:;|$)/);
		if (value != null && value.length > 1) {
			metaData["citation_doi"] = value[1].trim();
		}
		
		//get year
		value = citationData.match(/Published[\s]+([^;]*)[\s]*(?:;|$)/);
		if (value != null && value.length > 1) {
			metaData["citation_date"] = value[1].replace(/[^0-9]+/gi,"").trim();
		}
		
		//get publisher
		value = citationData.match(/Imprint[\s]+([^;]*)[\s]*(?:;|$)/);
		if (value != null && value.length > 1) {
			metaData["citation_publisher"] = value[1].trim().replace(/^academic[\s]+press$/i,"Elsevier, Academic Press");
		}
		
		//fix authors if necessary
		if (metaData["query_summary"]["citation_authors"] == 2) metaData["citation_authors"] = metaData["citation_authors"].replace(/[\s]*(?:,|and)[\s]*/gi," ; ");
		
		//fix abstract
		metaData["citation_abstract"] = metaData["citation_abstract"].replace(/^[\s]*(?:description|abstract)[\s\:\.]*/gi,"");
		
		//fix type
		metaData["citation_type"] = "book";
		
		//fix publisher
		if (metaData["citation_publisher"] == "") metaData["citation_publisher"] = "Elsevier B.V.";
		       
		//set database
		metaData["citation_database"] = "ScienceDirect";
		
	}
	
	// expose preformatting function
	return { preformatData : preformatData };

}());
