var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		return "";
	}

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_abstract: [ ['section#abstractWrap','innerText', true, 20000] ],
		citation_author: [ ['meta[name="wkhealth_authors"]','content'] ],
    citation_title: [ ['meta[name="wkhealth_title"]','content'] ],
    citation_doi: [ ['meta[name="wkhealth_doi"]','content'] ],
    citation_issn: [ ['meta[name="wkhealth_issn"]','content'] ],
    citation_volume: [ ['meta[name="wkhealth_volume"]','content'] ],
    citation_issue: [ ['meta[name="wkhealth_issue"]','content'] ],
    citation_firstpage: [ ['meta[name="wkhealth_firstpage"]','content'] ],
    citation_date: [ ['meta[name="wkhealth_article_publication_date"]','content'] , ['meta[name="wkhealth_date"]','content'] ],
    citation_journal_title: [ ['meta[name="wkhealth_journal_title"]','content'] , ['meta[name="wkhealth_journal_title_legacy"]','content'] ],
    citation_keywords: [ ['section.wp-article-keywords div.content-box-body','innerText',true] ],
		citation_misc: [ ['span#ej-journal-date-volume-issue-pg','innerText'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
