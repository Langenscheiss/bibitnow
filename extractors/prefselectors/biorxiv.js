var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {
		if (link == null || link == "") return "";
		return (metaData["citation_url_nopath"] + "/highwire/citation/" + link.trim() + "/ris");
	}

	function getFallbackURL(url) {
    return (url.search(/\.full\.pdf$/i) != -1) ?  url.replace(/\.full\.pdf$/i,"") : null;
  }

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_date: [ ['meta[name="dc.Date" i]','content'],['meta[property="dc.Date" i]','content'] ],
		citation_download: [ ['div.highwire-citation-info div.highwire-citation-type-highwire-article','data-node-nid'] ],
		citation_abstract: [ [ 'div#abstract-1','innerText', true, 20000] ],
		citation_doi: [ ['div.pub_jnl a','href'] ],
		citation_url: [ ['span.highwire-cite-metadata-doi','innerText'] ]
// 		citation_misc: [ ['blockquote.abstract script[type="math/tex"], blockquote.abstract span.MathJax','textContent',true, 1024, true, 1000] ], /*for mathjax detection*/
// 		citation_keywords: [ [ 'td.tablecell.subjects','innerText'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink , getFallbackURL: getFallbackURL };

}());
