var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {

		//return if link invalid
		if (link == null || link == "") return "";

		//return link with correct base url
		return (metaData["citation_url_nopath"] + link);
	}

	function getFallbackURL(url) {
    return (url.search(/\/pdf$/i) != -1) ?  url.replace(/\/pdf$/i,"") : null;
  }

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_author: [ ['meta[name="citation_author"]','content'] , ['span[data-authors=""] span[itemprop="author"] span[itemprop="name"]','innerText'] , ['span[itemprop="author"] span[itemprop="name"]','innerText'] ],
		citation_type: [ ['span#wd-book-print-isbn','innerText'] , ['span#wd-book-online-isbn','innerText'] ],
		citation_title: [ ['div#wd-pub-name h1[itemref="book"]','innerText'] , ['h1[itemprop="chapterName" i]','innerText'] ],
		citation_collection_title: [ ['div#wd-pub-name a','innerText'] ],
		citation_misc: [ ['div#wd-pub-name div.publication-sub-title','innerText'] ],
		citation_abstract: [ ['div.article-text.wd-jnl-art-abstract','innerText', true, 20000] , ['div#wd-book-page-intro','innerText', true, 20000] , ['div.chapter-text.wd-chapter-abstract','innerText', true, 20000] ],
		citation_date: [ ['span#wd-book-pub-date span[itemprop="datePublished"]','innerText'] , ['div#wd-bk-pg-about-book-content p[itemprop="datePublished" i]','innerText'] ],
		citation_firstpage: [ ['div.article-head span.small','innerText',true] ],
 		citation_download: [ ['a.btn.btn-primary.wd-btn-cit-abs-ris','href'] ] // the download citation button on iop seems to be crap! You have to throw away a lot!
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink , getFallbackURL: getFallbackURL };

}());
