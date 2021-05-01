var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// this function is called by the background script in order to return a properly formatted citation download link
	function formatCitationLink(metaData, link) {

		let doi = metaData["citation_download"];
		metaData["citation_download_method"] = "POST";
		if (doi != "") return (metaData["citation_url_nopath"] + "/action/exportCiteProcCitation?dois=" + encodeURIComponent(doi) + "&targetFile=custom-endNote&format=endNote&include-abs");
		return "";
	}

  function getFallbackURL(url) {
    return (url.search(/\/doi\/pdf\//i) != -1) ?  url.replace(/\/doi\/pdf\//i,"/doi/") : null;
  }

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_title: [ ['h1.citation__title','innerText'] , ['div.item-meta div.left-bordered-title span','innerText'] ],
		citation_publisher: [ ['p.publisher__name','innerText'] , ['div.publisher-info li','innerText'] , ['div.published-info li','innerText'] ],
		citation_publisher_address: [ ['div.published-info','innerText'] ],
		citation_author: [ ['div.pill-all-authors a.author-name','title'] , ['div.citation div.author-data span.loa__author-name','innerText'] , ['meta[name="citation_authors"]','content'] , ['div.contrib-metrics-bibliometrics li.accordion-tabbed__tab.accordion__closed.grid-item div.box-item__title-holder a','textContent'] ],
		citation_isbn: [ { query: 'div.left-side-meta',attribute: 'innerText', allowMultipleLines: true, lineSeparator: " |-| "}, { query: 'div.published-info',attribute: 'innerText', allowMultipleLines: true, lineSeparator: " |-| "} ],
		citation_journal_title: [ ['span.epub-section__title','innerText'] , ['meta[name="citation_journal_title"]','content'] ],
		citation_url: [ ['meta[name="citation_abstract_html_url"]','content'] ],
		citation_abstract: [ ['div.article__section.article__abstract','innerText',true,20000] , ['meta[name="dc.Description"]','content',true,20000], ['div#abstract','innerText',true,20000] , ['div.abstractSection','innerText',true,20000]],
		citation_doi: [  ['input[name=doiVal]','value'] , ['meta[name="citation_doi"]','content'] , ['a[href^="https://dx.doi.org"]','href'] ],
		citation_download: [ ['form[name="qiksearch"]', 'action'] , ['input[name=doiVal]','value'] ],
		citation_keywords: [ ['meta[name="dc.Subject" i]','content'] ],
		citation_issn: [ ['div.pill-information__content div.cover-image__details-extra div.flex-container span.space', 'innerText'] ],
		citation_misc: [ ['a.vol-issue.simple-tooltip__inline--r','data-title'] ],
		citation_date: [ ['span.dot-separator.date','innerText'] ],
		citation_firstpage: [ ['span.epub-section__pagerange','innerText'] ]
	};

	// finally expose selector message and link formatter
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink , getFallbackURL: getFallbackURL };

}());
