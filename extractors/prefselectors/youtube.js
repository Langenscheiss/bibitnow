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
		citation_authors: [ ['div#owner-container', 'innerText'] , ['div#upload-info ytd-channel-name#channel-name', 'innerText'] ],
		citation_channel: [ ['div#top-row a.ytd-video-owner-renderer','href'] ],
		citation_title: [ ['h1.title', 'innerText'] ],
		citation_abstract: [ ['yt-formatted-string#description','innerText',true,20000] ],/*the last two arguments tell the system that the extractor may pass several lines and up to 20000 chars to the parser*/
		citation_date: [ ['div#upload-info span.date', 'innerText'] ]
	};

	// finally expose selector message
	return { prefselectorMsg: prefselectorMsg , formatCitationLink: formatCitationLink };

}());
