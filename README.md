# bibitnow
Site adjusters for browser plugin "bibitnow"

Download developer version of BibItNow for Chrome/Chromium, Opera, Firefox and Safari
https://aqpl.mc2.chalmers.se/PDSU/files/BibItNowMultiBrowser.zip

"BibItNow" is a browser plugin that requires only a single click (or even less) to extract bibliographic data from abstract pages of journal articles, books and theses, and to translate this data to the Bibtex,RIS,Endnote or (B)arnold S. format. With another click or button press, this data is then either in the clipboard or accessible as a download, ready to be copied into your bibliography system of choice. The main purpose of this plugin is to separate the task of extracting bibliographic data from the bibliographic library functionality itself, thereby offering the benefit of a simpler and more streamlined export procedure compared to otherwise much more powerful library tools such as JabRef or Zotero. Compared to the latter, particular effort has been spent on a natural and simple integration of the bibtex format.

To achieve its goal, BibItNow relies on a combination of a meta data extractor with a carefully chosen set of standard queries on the one hand, and, on the other hand, on a number of website specific translators (which btw. ARE NOT SIMPLY taken from Zotero). This is exactly where your help is needed. This github allows you to contribute to the development of "BitItNow", by developing and publishing website specific adjusters. These adjusters allow you to do the following:
- using CSS queries, search the static website data for all supported bibliographic fields (authors, title, journal, etc.)
- extract and format website specific citation download link from which the plugin can dynamically download citation data (essentially carrying out the action of the website's export button)
- preformat extracted data before it is passed on to the main parser, and control how the static data is merged with any dynamically downloaded data.

All this functionality is implemented in 2 different javascript files per website, and a single xml file linking these files to a specific url. More precisely,

1.) nameResources/urlSpecificAdjusterList.json -- links url to selectors and preformatters. URLs are always matched without the http(s)://scheme and without the "www" subdomain. The matching process is described in detail in
- HOW_TO_CONTRIBUTE.pdf.

2.) Preferred selectors and Preformatters
The functions defined and exposed in these files allow you to define custom search queries via css selectors, extract and format a link for dynamic citation downloads, and to preformat extracted data before being sent to the main parser. Please refer to the pdf guide
- NOW_TO_CONTRIBUTE.pdf

and to the example files in
- extractors/prefselectors/
- background/preformatters/

for more information.

Thanks!