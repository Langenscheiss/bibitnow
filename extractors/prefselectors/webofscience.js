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
		citation_journal_title: [ ['div.l-content div.block-record-info-source p.sourceTitle','innerText'] ],
		citation_type: [ ['div.l-content div.block-record-info-source','innerText',true] ],
		citation_title: [ ['div.l-content div.title','innerText'] ],
		citation_authors: [ ['div.l-content div.block-record-info > p','textContent',true] ],
		citation_misc: [['div.l-content div.block-record-info','innerText', true, 20000] ],
		citation_volume: [ ['div.l-content div.block-record-info-source','innerText',true] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
