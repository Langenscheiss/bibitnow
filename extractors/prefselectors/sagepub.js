var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;
	
	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		var returnString = "";
		link = link.trim();
		if (link != null && link != "") {
			returnString = metaData["citation_url"].match(/^(http[s]?:\/\/[^\/]*).*$/);
			if (returnString != null && returnString.length > 1) {
				var temp = metaData["citation_download"];
				if (temp != null && temp != "") {
					returnString = returnString[1] + "/action/downloadCitation?doi=" + temp;
				} else {
					returnString = "";
				}
			} else {
				returnString = "";
			}
		}
		return returnString;
	}
	
	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_title: [ ['div.art_title a','innerText'] ],
		citation_journal_title: [ ['div.articleList span.journalName','innerText'] ],
		citation_volume: [ ['div.articleList span.volume','innerText'] ],
		citation_issue: [ ['div.articleList span.issue','innerText'] ],
		citation_firstpage: [ ['div.articleList span.page','innerText'] ],
		citation_misc: [ ['div.Article.information > div:first-of-type','innerText'] ],
		citation_author: [ ['div.articleList div.art_authors span.NLM_string_name','innerText'] ],
		citation_date: [ ['span.publicationContentEpubDate.dates','innerText'] , ['div.recommendCitationVolumeDate > p','innerText'] , ['div.articleList span.year','innerText'] ],
		citation_doi: [ ['div.publicationContentDoi a','href'] ],
		citation_issn: [ ['div.issnFooter span:nth-of-type(2)','innerText'] , ['div.issnFooter span','innerText'] ],
		citation_download: [ ['form[name="frmCitmgr"] input[name="doi"]','value'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
