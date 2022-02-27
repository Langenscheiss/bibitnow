var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		let queryNumber = metaData["query_summary"]["citation_download"];
    if (queryNumber == 1) {
      if (typeof(link) != 'string' || link.length == 0 || link == "") return "";
      return (metaData["citation_url_nopath"] + "/" + link);
    } else if (queryNumber == 2) {
			link = metaData["citation_doi"];
      metaData["citation_download_method"] = "POST";
      metaData["citation_download_content_type"] = "application/json; charset=utf-8";
      link = "{\"contentType\":\"1\",\"formatType\":\"0\",\"referenceType\":\"\",\"urlId\":\"" + link + "\"10.1656/045.027.m1601\"}";
      metaData["citation_download_requestbody"] = link;
			return (metaData["citation_url_nopath"] + "/citation/download");
		} else if (queryNumber == 3 && metaData["citation_volume"] != "" && metaData["citation_journal_abbrev"] != "") {
			return (metaData["citation_url_nopath"] + "/citation/download/citation-" + metaData["citation_journal_abbrev"] + metaData["citation_volume"] + "_" + link + ".ris");
		}
	}

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_journal_title: [ ['h1.pageTitleNoRule','innerText'] ],
		citation_misc: [ ['p.articleRef','innerText'] ],
		citation_date: [ ['meta[name="dc.Date" i]','content'] ],
		citation_issn: [ ['div#articleInfoBox p','innerText'] ],
		citation_abstract: [ ['div.abstractSection','innerText', true, 20000] , ['meta[name="citation_abstract" i]','content', true, 20000] ],
		citation_download: [ ['iframe.screenReaderText','src'] , ['meta[property="og:url"]','content'] , ['meta[name="citation_firstpage" i]','content'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
