var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	function formatCitationLink(metaData, link) {
		if (link == null || link == "") return "";
		return ("https:" + link);
	}

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = {
		citation_title: [ ['div#book-title','innerText'] , ['dd#abstract-about-title','innerText'] , ['div[data-test="book-title" i]','innerText'] ],
		citation_type: [ ['span#content-type','innerText'] , ['div#enumeration','innerText'] ],
		citation_publisher: [ ['span#publisher-name','innerText'], ['dd#abstract-about-publisher','innerText'] ],
		citation_date: [ ['div.article-dates time','datetime'], ['input[name="year"]','value'] , ['dd#abstract-about-book-chapter-copyright-year','innerText'] , ['span#copyright-info','innerText'] ],
		citation_author: [ ['span.authors__name','innerText'] , ['div.author-list li.author a[itemprop="name"]','innerText'] , ['div.editor-list li.editor a[itemprop="name"]','innerText'] ],
		citation_isbn: [ ['span#print-hardcover-isbn','innerText'] , ['input[name="facet-eisbn" i]','value'] , ['span#print-isbn','innerText'] , ['dd#abstract-about-book-print-isbn','innerText'] , ['dd#abstract-about-book-online-isbn','innerText'] , ['span#electronic-isbn','innerText'] ],
		citation_issn: [ ['span#print-issn','innerText'] , ['span#electronic-issn','innerText'] ],
		citation_doi: [ ['span#doi-url','innerText'] , ['dd#abstract-about-book-chapter-doi','innerText'] ],
		citation_abstract: [ ['section#Abs1','innerText',true,20000] , ['div#about div#book-description','innerText',true,20000] , ['section.Abstract','textContent',true,20000] ],
		citation_keywords: [ ['div#about span.Keyword','innerText'] , ['div.KeywordGroup span.Keyword','innerText'] ],
		citation_download: [ ['a[data-test="citation-link" i]','href'], ['ul.citations__content a[data-track-label="RIS" i]','href'] , ['div.citations a[data-gtmlabel="RIS"]','href'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
