var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		if (link == null && link == "") return "";
		return (metaData["citation_url_nopath"] + "/action/downloadCitation?doi=" + link + "&format=ris&include=abs");
	}

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_title: [ ['div.art_title a','innerText'] ],
		citation_type: [ ['a.search-breadcrumb','innerText'] ],
		citation_journal_title: [ ['div.articleList span.journalName','innerText'] ],
		citation_volume: [ ['div.articleList span.volume','innerText'] ],
		citation_issue: [ ['div.articleList span.issue','innerText'] ],
		citation_firstpage: [ ['div.articleList span.page','innerText'] ],
		citation_misc: [ ['div.Article.information > div:first-of-type','innerText'] ],
		citation_author: [ ['div.articleList div.art_authors span.NLM_string_name','innerText'] , ['h1 + div.paragraph-spacing ul.reset-list li a','innerText'] ],
		citation_date: [ ['span.publicationContentEpubDate.dates','innerText'] , ['div.recommendCitationVolumeDate > p','innerText'] , ['div.articleList span.year','innerText'] ],
		citation_abstract: [ ['div.abstractSection.abstractInFull','innerText', true, 20000] , ['div#description','innerText', true, 20000]],
		citation_keywords: [ ['div#term-disciplines a','innerText'] ],
		citation_doi: [ ['div.publicationContentDoi a','href'] ],
		citation_issn: [ ['div.issnFooter span:nth-of-type(2)','innerText'] , ['div.issnFooter span','innerText'] ],
		citation_isbn: [ ['div[anchor-type="isbn" i]','anchor'] ],
		citation_download: [ ['form[name="frmCitmgr"] input[name="doi"]','value'] ]
	};

  //function to obtain fallback url in case a pdf is loaded
  function getFallbackURL(url) {
    return (url.search(/\/doi\/pdf\//i) != -1) ?  url.replace(/\/doi\/pdf\//i,"/doi/abs/") : null;
  }

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink , getFallbackURL: getFallbackURL };

}());
