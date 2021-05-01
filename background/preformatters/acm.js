var BINPreformatter = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	//preformat raw data including raw RIS
	function preformatRawData(metaData, parser) {

		//remove everything prior to json
		let download = metaData["citation_download"].replace(/^.*\"items\"\:\[\{/gi,"");
		metaData["citation_download"] = "";

		//parse JSON
		if (download != "") {
			//fix authors
			let temp;
			if (download.search(/\"author\"\:/) != -1) {
				temp = download.replace(/^.*\"author\"\:\[\{/gi,"").replace(/\}\].*$/gi,"").replace(/(?:\"family\"\:\"|\"given\"\:\")/gi,"").replace(/\"\}\,\{/gi," ; ").replace(/\"\,/gi,", ").replace(/([^\\])\"/gi,"$1").replace(/\\\"/gi,"\"");
				if (temp != "") metaData["citation_authors"] = temp;
			}

		        //fix publisher place
		        temp = download.replace(/^.*\"publisher\-place\"\:\"/gi,"").replace(/\".*$/gi,"");
			if (temp != "") metaData["citation_publisher_address"] = temp;

			//fix type
			temp = download.replace(/^.*\"type\"\:\"/gi,"").replace(/\".*$/gi,"");
			if (temp != "") metaData["citation_type"] = temp.toLowerCase();

			//fix volume
			temp = download.replace(/^.*\"volume\"\:\"/gi,"").replace(/\".*$/gi,"");
			if (temp != "") metaData["citation_volume"] = temp;

			//fix issue
			temp = download.replace(/^.*\"issue\"\:\"/gi,"").replace(/\".*$/gi,"");
			if (temp != "") metaData["citation_issue"] = temp;

			//fix doi
			temp = download.replace(/^.*\"DOI\"\:\"/gi,"").replace(/\".*$/gi,"");
			if (temp != "") metaData["citation_doi"] = temp;

			//fix ISSN
			temp = download.replace(/^.*\"ISSN\"\:\"/gi,"").replace(/\".*$/gi,"");
			if (temp != "") metaData["citation_issn"] = temp;

			//fix title
			temp = download.replace(/^.*\"title\"\:\"/gi,"").replace(/\".*$/gi,"");
			if (temp != "") metaData["citation_title"] = temp;

			//fix journal abbreviation
			temp = download.replace(/^.*\"container\-title\"\:\"/gi,"").replace(/\".*$/gi,"");
			if (temp != "") metaData["citation_journal_abbrev"] = temp;

			//fix pages
			temp = download.replace(/^.*\"page\"\:\"/gi,"").replace(/\".*$/gi,"");
			if (temp != "") metaData["citation_firstpage"] = temp;

			//fix date
			if (metaData["citation_date"] == "") {
				temp = download.replace(/^.*\"original-date\"\:\{/gi,"").replace(/\}.*$/gi,"").replace(/(?:^.*[\[]+|[\]]+.*$)/gi,"").replace(/\,/gi,"-");
				if (temp != "") metaData["citation_date"] = temp;
			}


			//dummy string in citation_download to suggest successful data retreival
			metaData["citation_download"] = "TY - JOUR\nER -";

		}
	}

	//preformatting function
	function preformatData(metaData, parser) {

		//fix author list
		temp = metaData["citation_authors"];
		metaData["citation_authors"] = temp != "" ? temp.replace(/;\ /g, " ; ").replace(/\ ;\ $/,"").trim() : "";

		//check if book
		if ((temp = metaData["citation_isbn"]) != "") {
			metaData["citation_type"] = "book";
			metaData["citation_isbn"] = temp.replace(/(?:^.*ISBN\:|[\s]*DOI.*$)/gi,"");
			if (metaData["citation_publisher"] == "") {
				metaData["citation_publisher"] = temp.replace(/[\s]*ISBN.*$/gi,"").replace(/\ \|\-\|\ /gi, ", ");
			}
		}

		//check if book chapter
		if (metaData["citation_type"].search(/(?:chapter|conference)/i) != -1) {
			let collectionTitle = metaData["citation_journal_title"];
			if (collectionTitle == "") collectionTitle = metaData["citation_journal_abbrev"];
			metaData["citation_collection_title"] = collectionTitle;
			metaData["citation_journal_title"] = ""; metaData["citation_journal_abbrev"] = "";
		}

		//set database
		metaData["citation_database"] = "ACM Digital Library";
	}

	// expose preformatting function and raw preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData };

}());
