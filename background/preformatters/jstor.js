var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {
		//fix abstract, author title and date
		let downloadData = metaData["citation_download"];
		if (metaData["query_summary"]["citation_download"] == 3) downloadData =  downloadData.replace(/A2[\t\ ]+[\-]+[\t\ ]+/g,"BIT - ");
		metaData["citation_download"] = downloadData.replace(/AB[\t\ ]+[\-]+[\t\ ]+/,"N2 - ").replace(/A[0-9][\t\ ]+[\-]+[\t\ ]+/g,"AU - ").replace(/TI[\t\ ]+[\-]+[\t\ ]+/,"T1 - ").replace(/PY[\t\ ]+[\-]+[\t\ ]+/,"Y1 - ").trim();
	}

	//preformatting function
	function preformatData(metaData, parser) {

		//fix database
		metaData["citation_database"] = "JSTOR";

		//fix author list
		metaData["citation_authors"] = metaData["citation_authors"].replace(/(?:[\s]+and|[\s]*\,)[\s]+/g, ' ; ');

		//abstract date from misc
    let date = ""; let misc = metaData["citation_misc"];
    if (metaData["query_summary"]["citation_misc"] == 3) {
        metaData["citation_journal_title"] = misc.replace(/^.*\"contentName\"[\s]*\:[\s]*\"/gi,"").replace(/[\s]*\".*$/gi,"");
        metaData["citation_doi"] = misc.replace(/^.*\"objectDOI\"[\s]*\:[\s]*\"/gi,"").replace(/[\s]*\".*$/gi,"");
        misc = misc.replace(/^.*\"contentIssue\"[\s]*\:[\s]*\"/gi,"");
    }
    misc = misc.replace(/[\s]*\([^\)]*\)[\s]*/gi,
      function(match, offset, original) {
        if (date.length == 0) date = match;
        return "";
      }
    );
		if (metaData["query_summary"]["citation_date"] == 1 && date == "") {
			metaData["citation_date"] = metaData["citation_date"].replace(/^[^0-9]*date\:[\s]*/i,"");
		} else if (metaData["query_summary"]["citation_date"] != 2) {
			metaData["citation_date"] = date;
		}

    //fix publisher
    if (metaData["query_summary"]["citation_publisher"] == 3) {
      metaData["citation_publisher"] = metaData["citation_publisher"].replace(/^.*Published[\s]+by[\s\:]*/gi,"").replace(/[\s]*\|\-\|.*$/gi,"");
    }

		//fix volume and issue
		metaData["citation_misc"] = misc.replace(/vo[l]?[\.\s]+/i,"Volume ").replace(/No[\.\s]+/i,"Issue ").replace(/[p]+[\.\s]+/,"Page ");

		//fix abstract
		metaData["citation_abstract"] = metaData["citation_abstract"].replace(/^[\s]*(?:abstract|book[\s]*description)[\s\:\.]*/gi,"").replace();

		//fix keywords
		metaData["citation_keywords"] = metaData["citation_keywords"].replace(/^[\s]*topic[s]*[\s\:\.]*/gi,"");

		//fix DOI
		metaData["citation_doi"] = metaData["citation_doi"].replace(/10\.2307\/.*/gi,"");

		//fix pages
		if (metaData["query_summary"]["citation_firstpage"] == 1) {
			metaData["citation_firstpage"] = metaData["citation_firstpage"].replace(/\([^\(\)]+\)[\s]*$/i,"");
		}

		//fix dynamic publisher, and prefer static abstract, title, date, issn over dynamic!
		let download = metaData["citation_download"];
		if (download != null && typeof(download) == 'object') {
			download["citation_publisher"] = download["citation_publisher"].trim().replace(/(?:^[\[]+|[\]]+$)/g,"").trim();
			if (metaData["citation_abstract"] != "" && metaData["query_summary"]["citation_abstract"] > 0) download["citation_abstract"] = "";
			if (metaData["citation_title"] != "") download["citation_title"] = "";
			if (metaData["citation_date"] != "") download["citation_date"] = "";
			if (metaData["citation_issn"] != "") {
				download["citation_issn"] = "";
			} else {
				download["citation_issn"] = download["citation_issn"].replace(/[\s]*\,.*$/i,"");
			}

			//fix doi
			download["citation_doi"] = download["citation_doi"].replace(/10\.2307\/.*/gi,"");
		}
	}

	// expose preformatting function
	return { preformatData : preformatData, preformatRawData: preformatRawData };

}());
