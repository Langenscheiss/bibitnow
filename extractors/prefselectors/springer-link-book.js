var BINPrefselector = ( function () {

	// a shadow as a "promise not to touch global data and variables". Must be included to be accepted!
	var BINData = null;
	var BINInteraction = null;
	var BINParser =  null;
	var window = null;
	var document = null;

	// these are the preferred selectors used, and may be modified. The format is "bibfield: [ [css-selector,attribute], ...],", where "attribute" can be any html tag attribute or "innerText" to get the text between <tag> and </tag>
	var prefselectorMsg = { 
		citation_title: [ ['dd#abstract-about-title','innerText'] ],
		citation_type: [ ['div#enumeration','innerText'] ],
		citation_publisher: [ ['dd#abstract-about-publisher','innerText'] ],
		citation_date: [ ['dd#abstract-about-book-chapter-copyright-year','innerText'] ],
		citation_author: [ ['div.author-list li.author a[itemprop="name"]','innerText'] , ['div.editor-list li.editor a[itemprop="name"]','innerText'] ],
		citation_issn: [ ['dd#abstract-about-book-print-isbn','innerText'] , ['dd#abstract-about-book-online-isbn','innerText'] ],
		citation_doi: [ ['dd#abstract-about-book-chapter-doi','innerText'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg };

}());
