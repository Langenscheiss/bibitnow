var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_journal_title: [ ['meta[name="og:site_name"]','content'] ],
		citation_authors: [ ['meta[name="citation_author"]','content'] , ['meta[name="news_authors"]','content'] ],
		citation_doi: [ ['meta[name="citation_doi"]','content'] , ['meta[name="news_doi"]','content'] ],
		citation_keywords: [ ['meta[name="news_key_words"]','content'] ],
		citation_abstract: [ ['meta[name="citation_abstract"]','content', true, 20000] , ['meta[property="og:description"]','content', true, 20000] ],
		citation_download: [ ['div.highwire-citation-formats-links li.ris a','href'] ]
	};

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		if (link == null || link == "") return "";
		return (metaData["citation_url_nopath"] + link);
	}

	function getFallbackURL(url) {

    //if pdf
    url = (url.search(/.*\.[\s]*pdf[\s]*$/i) != -1) ? url.replace(/\/content\/[^\/]+\//i,"/content/") : null;
    return url;

  }

	// expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink, getFallbackURL: getFallbackURL };

}());
