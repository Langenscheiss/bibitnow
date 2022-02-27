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
		metaData["citation_download"] = metaData["citation_download"].replace(/(?:JA|JO|PY)[\t\ ]+[\-]+[\t\ ]+/g,"BIT - ").trim();
	}

	//preformatting function
	function preformatData(metaData, parser) {

		//preformat misc for journal, volume, issue and pages
		let misc = metaData["citation_misc"];
		if (misc != "") {

			//get volume
			misc = misc.replace(/^[^0-9]*/,"").trim();
			metaData["citation_volume"] = misc.replace(/(?:[\(:]|,[\s]*issue).*$/i,"").trim();

			//get issue if available
			let issue = misc.match(/issue([^\,:]*)[\,:]/i);
			if (issue != null && issue.length > 1) {
				metaData["citation_issue"] = issue[1].trim();
				misc = misc.replace(/^[^\(:]*/,"").trim();
			} else {
				misc = misc.replace(/^[^\(:]*/,"").trim();
				if (misc.charAt(0) != ":") metaData["citation_issue"] = misc.replace(/\).*$/,"").replace(/^\(/,"").trim();
			}

			//get pages
			misc = misc.replace(/^[^:]*:/,"").replace(/\..*$/,"").trim();
			if (misc != "") {
				misc = misc.split("-");
				if (misc != null) {
					if (misc.length > 0) metaData["citation_firstpage"] = misc[0];
					if (misc.length > 1) metaData["citation_lastpage"] = misc[1];
				}
			}
		}
		//clear misc
		metaData["citation_misc"] = "";

		//fix abstract, prefer static over dynamic
		misc = metaData["citation_abstract"].replace(/^Abstract[\s\.]*/i,"");
		metaData["citation_abstract"] = misc;
		if ((metaData = metaData["citation_download"]) != null && typeof(metaData) == 'object') {
			metaData["citation_abstract"] = misc != "" ? "" : metaData["citation_abstract"].replace(/^Abstract[\s\.]*/i,"");
		}

		//set database
		metaData["citation_database"] = "BioOne Complete";
	}

	// expose preformatting function
	return { preformatData : preformatData , preformatRawData: preformatRawData};

}());
