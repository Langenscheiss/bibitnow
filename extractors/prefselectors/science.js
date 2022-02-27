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
		citation_doi: [ ['meta[name="citation_doi"]','content'] , ['meta[name="news_doi"]','content'] , ['meta[scheme="doi" i]','content'] ],
    citation_volume: [ ['span[property="volumeNumber"]','innerText'] ],
		citation_issue: [ ['span[property="issueNumber"]','innerText'] ],
    citation_firstpage: [ ['span[property="pageStart"]','innerText'] ],
		citation_lastpage: [ ['span[property="pageEnd"]','innerText'] ],
    citation_keywords: [ ['meta[name="news_key_words"]','content'] ],
		citation_abstract: [ ['section#abstract','innerText', true, 20000] , ['meta[name="citation_abstract"]','content', true, 20000] , ['meta[property="og:description"]','content', true, 20000] ],
		citation_download: [ ['form.citation-form','action'] , ['div.highwire-citation-formats-links li.ris a','href'] ],
    citation_issn: [ ['div.footer__copyright p','innerText', true, 20000] ]
	};

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
    //early out if no link or doi
		if (link == null || link == "") return "";
    let doi = metaData["citation_doi"];
    if (doi == null || doi == "") return "";

    //set link, POST method, content type and cookie policy
    link = metaData["citation_url_nopath"] + link;
    metaData["citation_download_method"] = "POST";
    metaData["citation_download_content_type"] = "application/x-www-form-urlencoded";
    metaData["citation_download_cookie"] = "cookiePolicy=iaccept";

    //generate request
    doi = "doi=" + doi.replace(/\//g,"%2F") + "&downloadFileName=bla&include=abs&format=ris&direct=&submit=EXPORT+CITATION";
    metaData["citation_download_requestbody"] = doi;

		return link;
	}

	function getFallbackURL(url) {

    //if pdf
    url = (url.search(/.*\.[\s]*pdf[\s]*$/i) != -1) ? url.replace(/\/content\/[^\/]+\//i,"/content/") : null;
    return url;

  }

	// expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink, getFallbackURL: getFallbackURL };

}());
